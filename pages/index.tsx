import { LayoutLanding } from "../src/layouts";
import { SectionAbout, SectionFeatures, SectionHello, SectionPricing } from "../src/sections";

export default function Home() {
  return (
    <LayoutLanding>
      <SectionHello />
      <SectionAbout />
      <SectionFeatures />
      <SectionPricing />
    </LayoutLanding>
  );
}
