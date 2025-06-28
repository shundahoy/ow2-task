"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../lib/actions/registerUser";
import { useActionState } from "react";
import { RegisterFormState } from "../(types)/type";

const INITIAL_STATE: RegisterFormState = {
  errors: {
    email: [],
    password: [],
  },
  isSuccess: false,
};

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(registerUser, INITIAL_STATE);

  useEffect(() => {
    if (state.isSuccess) {
      alert("登録が完了しました！");
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            ようこそ、オーバーウォッチの世界へ — 未来のために戦え
          </h1>
          <p className="leading-relaxed mt-4">
            オーバーウォッチは、近未来の地球を舞台にしたチーム制アクションシューティングゲームです。
            個性豊かなヒーローたちが、それぞれの特殊能力を活かしながら、チームで連携して勝利を目指します。
            あなたのプレイスタイルに合ったヒーローを選び、仲間とともに戦場を駆け抜けましょう。
          </p>
        </div>
        <form
          action={formAction}
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            登録
          </h2>

          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {state.errors?.email?.map((err, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">
                {err}
              </p>
            ))}
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              パスワード
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 text-sm text-blue-500 hover:underline"
            >
              {showPassword ? "非表示" : "表示"}
            </button>

            {state.errors?.password?.map((err, index) => {
              return (
                <p key={index} className="text-red-500 text-xs mt-1">
                  {err}
                </p>
              );
            })}
          </div>
          <div className="flex flex-row gap-4">
            <button className="flex-1 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              登録
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            ※ 登録は無料です。今すぐオーバーウォッチの世界に飛び込みましょう。
          </p>
        </form>
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={() => {
            const audio = new Audio("/ryuken.mp3");
            audio.play();
          }}
        >
          竜剣ボタン
        </button>
      </div>
    </section>
  );
};

export default RegisterPage;
