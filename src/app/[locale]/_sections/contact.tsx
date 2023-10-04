import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Section = () => {
  const t = useTranslations("Index");

  return (
    <section id="contact">
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{t("contact.title")}</h1>
              <p className="mt-4 text-xl text-gray-500">{t("contact.description")}</p>
            </div>
            <div>
              <div className="mt-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <Image
                            src="/assets/italian-dog.webp"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={3024}
                            height={4032}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/assets/mountain-dog.webp"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={3024}
                            height={4032}
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/assets/croatian-dog.webp"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={3024}
                            height={4032}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/assets/driving-dog.webp"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={3024}
                            height={4032}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/assets/curved-dog.webp"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={3024}
                            height={4032}
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/assets/mountain-dog.webp"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={3024}
                            height={4032}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/assets/curved-dog.webp"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={3024}
                            height={4032}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start">
                  <a
                    href="mailto:amadeusz@blanik.me"
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                  >
                    {t("contact.cta.mail")}
                  </a>

                  <a
                    href="https://linkedin.com/in/amadeuszblanik"
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 mt-2"
                  >
                    {t("contact.cta.linkedin")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
