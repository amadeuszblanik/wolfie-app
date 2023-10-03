import React from "react";
import { useTranslations } from "next-intl";
import Barbell from "@/icons/barbell.svg";
import Heart from "@/icons/heart.svg";
import MedKit from "@/icons/medkit.svg";

const features = [
  {
    icon: Barbell,
  },
  {
    icon: Heart,
  },
  {
    icon: MedKit,
  },
];

export const Section = () => {
  const t = useTranslations("Index");

  return (
    <section id="features">
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">{t("features.upper")}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("features.title")}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t("features.description")}</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature, index) => (
                <div key={index} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {t(`features.items.${index}.name`)}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{t(`features.items.${index}.description`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
