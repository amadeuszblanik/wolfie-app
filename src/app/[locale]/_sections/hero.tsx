import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Section = () => {
  const t = useTranslations("Index");

  return (
    <section className="hero">
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4 flex items-center">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">{t("hero.upper")}</h2>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{t("hero.title")}</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">{t("hero.description")}</p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/download"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t("hero.cta")}
                  </Link>
                </div>
              </div>
            </div>
            <Image
              src="/assets/hero.webp"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width="2442"
              height="1442"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
