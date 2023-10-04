import { SectionContact, SectionFeatures, SectionHero, SectionPricing } from "@/app/[locale]/_sections";
import { ApiService } from "@/service";

async function getData() {
  const res = await new ApiService().public.pricing.get();

  return res;
}

export default async function Home() {
  const { data, error } = await getData();

  return (
    <main>
      <SectionHero />
      <SectionFeatures />
      <SectionPricing data={data} error={error} />
      <SectionContact />
    </main>
  );
}
