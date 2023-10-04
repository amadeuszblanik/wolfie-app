import { useTranslations } from "next-intl";
import { SectionContact, SectionFeatures, SectionHero, SectionPricing } from "@/app/[locale]/_sections";
import { Footer, TopBar } from "@/components";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <>
      <TopBar
        items={[
          {
            title: t("nav.features"),
            link: "/#features",
          },
          {
            title: t("nav.pricing"),
            link: "/#pricing",
          },
          {
            title: t("nav.contact"),
            link: "/#contact",
          },
        ]}
        cta={{
          title: t("nav.cta"),
          link: "/download",
        }}
      />
      <main>
        <SectionHero />
        <SectionFeatures />
        <SectionPricing />
        <SectionContact />
      </main>
      <Footer />
    </>
  );
}
