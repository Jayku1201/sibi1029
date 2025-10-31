# Production image for the SiBi Advisory CMS
FROM node:20-alpine AS base

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Install dependencies separately to take advantage of caching
COPY package.json package-lock.json* .npmrc* ./
RUN npm install --omit=dev && npm cache clean --force

# Copy application files
COPY prisma ./prisma
COPY . .

# Generate Prisma client and build Next.js app
RUN npx prisma generate && npm run build

# Production runner image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start"]
