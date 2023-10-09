import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LogoAppleAppStore from "@/icons/logo-apple-appstore.svg";
import LogoGooglePlayStore from "@/icons/logo-google-playstore.svg";

interface Props {
  appStoreUrl: string | null;
  playStoreUrl: string | null;
}

const Section: React.FC<Props> = ({ appStoreUrl, playStoreUrl }) => {
  const t = useTranslations("Download");

  return (
    <section className="bg-white">
      <div className="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
        <div className="flex justify-center xl:w-1/2">
          <Image
            src="/assets/qr-code.svg"
            width={1005}
            height={1047}
            alt="qr-code"
            className="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover"
          />
        </div>

        <div className="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl">{t("title")}</h2>

          <p className="block max-w-2xl mt-4 text-gray-500">{t("description")}</p>

          <div className="mt-6 sm:-mx-2">
            {appStoreUrl && (
              <Link
                href={appStoreUrl}
                className="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 mt-4 overflow-hidden text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                target="_blank"
              >
                <LogoAppleAppStore className="w-5 h-5 mx-2 fill-current" />

                <span className="mx-2">{t("cta.ios")}</span>
              </Link>
            )}

            {playStoreUrl && (
              <Link
                href={playStoreUrl}
                className="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 overflow-hidden text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                target="_blank"
              >
                <LogoGooglePlayStore className="w-5 h-5 mx-2 fill-current" />

                <span className="mx-2">{t("cta.android")}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
