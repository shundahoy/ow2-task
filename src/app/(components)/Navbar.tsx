import React from "react";
import { LuScanSearch } from "react-icons/lu";
import { auth, signOut } from "@/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();
  const isLogin = !!session?.user;
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">OW2タスク管理表</span>
        </a>
        {isLogin && (
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-5">
            <a className="hover:text-gray-900">
              <LuScanSearch size="1.5em" />
            </a>
            <Link href="/dashboard" className="hover:text-gray-900">
              タスク一覧
            </Link>
            <Link href="/dashboard/create" className="hover:text-gray-900">
              タスク登録
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                className="hover:text-gray-900 cursor-pointer"
                type="submit"
              >
                ログアウト
              </button>
            </form>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
