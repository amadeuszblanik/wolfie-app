"use client";

import { useTranslations } from "next-intl";
import { FormEventHandler, useState } from "react";
import { useQueryResetPassword } from "@/query";

interface Props {
  searchParams: {
    token: string;
  };
}

export default function Home({ searchParams: { token } }: Props) {
  const t = useTranslations("Auth.ResetPassword");
  const { mutate, data, error } = useQueryResetPassword();

  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    mutate({ token, password });
  };

  if (!token) {
    return (
      <main>
        <div>
          <div className="mt-2 text-center">
            <h1 className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">{t("error")}</h1>
          </div>
        </div>
      </main>
    );
  }

  if (data) {
    return (
      <main>
        <div>
          <div className="mt-2 text-center">
            <h1 className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">{data.message}</h1>
          </div>
        </div>
      </main>
    );
  }

  const passwordFieldError = Object.values(
    error?.errors?.find((cur) => cur.property === "password")?.constraints ?? [],
  ).join(", ");

  if (error && !passwordFieldError) {
    return (
      <main>
        <div>
          <div className="mt-2 text-center">
            <h1 className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">{error.message}</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div>
        <div className="mt-2 text-center">
          <h1 className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">{t("title")}</h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t("description")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="w-full mt-4">
          <input
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
            placeholder={t("password")}
            aria-label={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="mt-3 text-xs text-red-400">{passwordFieldError}</p>
        </div>

        <div className="flex items-center justify-end mt-4">
          <button
            className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            type="submit"
          >
            {t("cta")}
          </button>
        </div>
      </form>
    </main>
  );
}
