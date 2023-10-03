import { getRequestConfig } from "next-intl/server";

export const I18N_LOCALES = ["en", "pl"];

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
