import "../globals.scss";
import { Inter } from "next/font/google";
import React, { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { I18N_LOCALES } from "@/i18n";
import { ReactQueryProvider } from "@/providers";
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

  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
