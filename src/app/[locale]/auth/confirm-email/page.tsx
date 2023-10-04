"use client";

import { useTranslations } from "next-intl";
import { useQueryConfirmEmail } from "@/query";

interface Props {
  searchParams: {
    token: string;
  };
}

export default function Home({ searchParams: { token } }: Props) {
  const { mutate, data, error } = useQueryConfirmEmail();

  const t = useTranslations("Auth.ConfirmEmail");

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

  if (error) {
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

      <div className="mt-5 sm:flex sm:items-center sm:justify-end">
        <div className="sm:flex sm:items-center ">
          <button
            className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            onClick={() => mutate(token)}
          >
            {t("cta")}
          </button>
        </div>
      </div>
    </main>
  );
}
