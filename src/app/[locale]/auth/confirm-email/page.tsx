import { useTranslations } from "next-intl";
import HotFix from "@/app/[locale]/auth/confirm-email/hot-fix";

interface Props {
  searchParams: {
    token: string;
  };
}

export default function Home({ searchParams: { token } }: Props) {
  const t = useTranslations("Auth.ConfirmEmail");

  if (!token) {
    return (
      <main>
        <div>
          <div className="mt-2 text-center">
            <h1 className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">{t("error")}</h1>
          </div>
        </div>
      </main>
    );
  }

  return <HotFix token={token} />;
}
