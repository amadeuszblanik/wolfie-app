import { LayoutLanding } from "../src/layouts";
import { SectionAbout, SectionContact, SectionFeatures, SectionHello, SectionPricing } from "../src/sections";

export default function Page() {
  return (
    <LayoutLanding>
      <SectionHello />
      <SectionAbout />
      <SectionFeatures />
      <SectionPricing />
      <SectionContact />
    </LayoutLanding>
  );
}
