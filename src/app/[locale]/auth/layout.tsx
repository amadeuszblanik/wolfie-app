import "../../globals.scss";
import { PropsWithChildren } from "react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wolfie.app 🔒",
  description: "Pet companion app for iOS and Android",
};

export default function LocaleLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-700">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: "url('/assets/mountain-dog.webp')",
            minHeight: 480,
          }}
        ></div>

        <div className="flex flex-col justify-center items-center w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <Image className="w-auto h-7 sm:h-8" src="/logo.svg" alt="Wolfie.app logo" width={72} height={72} />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
