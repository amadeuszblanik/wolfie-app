import createMiddleware from "next-intl/middleware";
import { I18N_LOCALES } from "@/i18n";

export default createMiddleware({
  locales: I18N_LOCALES,

  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
