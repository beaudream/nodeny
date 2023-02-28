-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DownLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "takenTime" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "shareId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DownLog_shareId_fkey" FOREIGN KEY ("shareId") REFERENCES "Share" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DownLog_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DownLog" ("createdAt", "fileId", "id", "ip", "shareId", "takenTime") SELECT "createdAt", "fileId", "id", "ip", "shareId", "takenTime" FROM "DownLog";
DROP TABLE "DownLog";
ALTER TABLE "new_DownLog" RENAME TO "DownLog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
