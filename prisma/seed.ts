import { PrismaClient } from "../src/generated/prisma";
import axios from "axios";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  // 既存データを削除
  await prisma.mRole.deleteMany();
  await prisma.mChar.deleteMany();
  await prisma.mStatus.deleteMany();
  await prisma.tUser.deleteMany();
  await prisma.tTask.deleteMany();
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'TUser';`;
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'TTask';`;

  // ロール型定義
  type Role = {
    key: string;
    name: string;
    icon: string;
    description: string;
  };

  // ロールデータ取得・登録
  const response1 = await axios.get("https://overfast-api.tekrop.fr/roles");
  const rolesData: Role[] = response1.data;

  for (let i = 0; i < rolesData.length; i++) {
    const role = rolesData[i];
    await prisma.mRole.create({
      data: {
        role_id: i + 1,
        role_name: role.name,
      },
    });
  }

  // ヒーローデータ取得・登録
  const response2 = await axios.get("https://overfast-api.tekrop.fr/heroes");
  const charData = response2.data;

  for (let i = 0; i < charData.length; i++) {
    const char = charData[i];
    const roleId =
      rolesData.findIndex((role: Role) => role.key === char.role) + 1;

    await prisma.mChar.create({
      data: {
        char_id: i + 1,
        role_id: roleId,
        char_name: char.name,
      },
    });
  }

  // ステータス登録
  await prisma.mStatus.createMany({
    data: [
      { status_code: 1, status_name: "未対応" },
      { status_code: 2, status_name: "対応中" },
      { status_code: 3, status_name: "完了" },
    ],
  });

  // ユーザー登録（ハッシュ付き）
  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await prisma.tUser.create({
    data: {
      email: "test@gmail.com",
      password: hashedPassword,
    },
  });

  // タスク
  await prisma.tTask.create({
    data: {
      user_id: user.user_id,
      title: "テストタスク1",
      role_id: 1,
      char_id: 8,
      status_code: 1,
      comment: "タンク練習してね",
      create_date: "1970-01-01T00:00:00.000Z",
    },
  });
  await prisma.tTask.create({
    data: {
      user_id: user.user_id,
      title: "テストタスク2",
      role_id: 2,
      char_id: 11,
      status_code: 2,
      comment: "DPS練習してね",
      create_date: "1970-01-01T00:00:00.000Z",
    },
  });
  await prisma.tTask.create({
    data: {
      user_id: user.user_id,
      title: "テストタスク3",
      role_id: 3,
      char_id: 18,
      status_code: 3,
      comment: "サポート練習してね",
      create_date: "1970-01-01T00:00:00.000Z",
    },
  });
};

// 実行
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
