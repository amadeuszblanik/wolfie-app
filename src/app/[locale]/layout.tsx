import "../globals.scss";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { TopBar } from "@/components";
import { I18N_LOCALES } from "@/i18n";
import type { Metadata } from "next";

interface Props extends PropsWithChildren {
  params: {
    locale: string;
  };
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wolfie.app",
  description: "Pet companion app for iOS and Android",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  const isValidLocale = I18N_LOCALES.some((cur) => cur === locale);
  if (!isValidLocale) {
    notFound();
  }

  const t = useTranslations("Index");

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <TopBar
          items={[
            {
              title: t("nav.about"),
              link: "#",
            },
            {
              title: t("nav.features"),
              link: "#",
            },
            {
              title: t("nav.pricing"),
              link: "#",
            },
            {
              title: t("nav.contact"),
              link: "#",
            },
          ]}
          cta={{
            title: t("nav.cta"),
            link: "#",
          }}
        />
        {children}
      </body>
    </html>
  );
}
