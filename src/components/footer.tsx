import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

const Component = () => {
  const t = useTranslations("Index.footer");

  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://wolfie.app/" className="flex items-center">
              <Image src="/logo.svg" className="h-8 mr-3" alt="Wolfie.app Logo" width={32} height={32} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">Wolfie.app</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-1">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">{t("legal.title")}</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link href="/privacy-policy" className="hover:underline">
                    {t("legal.privacy_policy")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2022-{new Date().getFullYear()}{" "}
            <a href="https://wolfie.app/" className="hover:underline">
              Wolfie.app
            </a>{" "}
            All rights reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <span className="text-sm text-gray-500 sm:text-center">Made with ❤️ in 🇪🇺</span>
          </div>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="https://blanik.me" className="text-gray-500 hover:text-gray-900">
              👨🏻‍💻
              <span className="ml-2">by Blanik.me</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Component;
