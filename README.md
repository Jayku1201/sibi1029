# sibi-advisory-site

這是一個使用 Next.js 14、Prisma 和 Supabase 建立的企業網站範例，所有內容（文字、圖片、導覽連結、社群連結、Logo、聯絡表單通知）都可由管理後台 `/admin` 編輯。

## 特點

- **Next.js 14**：使用 App Router 架構及 TypeScript，支援動態 API。
- **Prisma + PostgreSQL**：採用 Supabase 的免費 PostgreSQL 方案，支援 JSONB 儲存區塊內容。
- **Supabase Storage**：圖片上傳至 `media` bucket，自動生成公開 URL。
- **Tailwind CSS**：快速實作響應式設計。
- **管理者後台**：簡易密碼登入即可修改網站所有區塊與圖片，調整導覽列、社群連結。

## 使用方式

1. 複製本專案並安裝依賴：

   ```bash
   npm install
   ```

2. 建立 `.env` 檔案，根據 `.env.example` 填入 Supabase 及資料庫連線資訊、管理者密碼與通知 Email。
3. 生成 Prisma client 並佈署資料庫結構：

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

4. 啟動開發伺服器：

   ```bash
   npm run dev
   ```

5. 訪問 http://localhost:3000 查看網站，後台位於 http://localhost:3000/admin 。

## 部署

建議使用 Vercel + Supabase：

1. 在 Supabase 建立專案與 `media` 存儲桶，設定 `anon` 及 `service_role` 金鑰。
2. 在 Vercel 建立新專案，連接 GitHub 倉庫，並於環境變數中設定 `DATABASE_URL`、`DIRECT_URL`、`SUPABASE_URL`、`SUPABASE_ANON_KEY`、`SUPABASE_SERVICE_ROLE_KEY`、`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`、`ADMIN_PASSWORD`、`JWT_SECRET`、`CONTACT_NOTIFY_EMAILS`。
3. 部署完成後綁定自己的網域。
