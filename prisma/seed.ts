import { PrismaClient } from "../src/generated/prisma";
import axios from "axios";

const prisma = new PrismaClient(); // PrismaClientのインスタンス生成

const main = async () => {
  // 各テーブルから既存の全レコードを削除
  await prisma.mRole?.deleteMany();
  await prisma.mStatus?.deleteMany();

  // ロールデータ
  const response1 = await axios.get("https://overfast-api.tekrop.fr/roles");
  const rolesData = response1.data;
  for (let i = 0; i < rolesData.length; i++) {
    const role = rolesData[i];
    await prisma.mRole.create({
      data: { role_id: i + 1, role_name: role["name"] },
    });
  }

  // ヒーローデータ
  const response2 = await axios.get("https://overfast-api.tekrop.fr/heroes");
  const charData = response2.data;
  for (let i = 0; i < charData.length; i++) {
    const char = charData[i];
    const roleId = rolesData.findIndex((role: any) => role.key === char.role);
    await prisma.mChar.create({
      data: { char_id: i + 1, role_id: roleId + 1, char_name: char["name"] },
    });
  }

  const s1 = await prisma.mStatus.create({
    data: { status_code: 1, status_name: "未対応" },
  });
  const s2 = await prisma.mStatus.create({
    data: { status_code: 2, status_name: "対応中" },
  });
  const s3 = await prisma.mStatus.create({
    data: { status_code: 3, status_name: "完了" },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
