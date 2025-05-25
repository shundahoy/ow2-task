-- CreateTable
CREATE TABLE "TUser" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TTask" (
    "task_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "char_id" INTEGER NOT NULL,
    "create_date" DATETIME NOT NULL,
    "status_code" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "TTask_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "TUser" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TTask_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "MRole" ("role_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TTask_char_id_fkey" FOREIGN KEY ("char_id") REFERENCES "MChar" ("char_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TTask_status_code_fkey" FOREIGN KEY ("status_code") REFERENCES "MStatus" ("status_code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MRole" (
    "role_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MChar" (
    "char_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role_id" INTEGER NOT NULL,
    "char_name" TEXT NOT NULL,
    CONSTRAINT "MChar_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "MRole" ("role_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MStatus" (
    "status_code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status_name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TUser_email_key" ON "TUser"("email");
