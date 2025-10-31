-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "ContentBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "section" TEXT NOT NULL,
    "fieldKey" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "ContentBlock_section_fieldKey_key" ON "ContentBlock"("section", "fieldKey");

CREATE TRIGGER IF NOT EXISTS update_contentblock_updatedAt
AFTER UPDATE ON "ContentBlock"
FOR EACH ROW
BEGIN
  UPDATE "ContentBlock" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = OLD."id";
END;
