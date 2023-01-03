import { LayoutLanding } from "../src/layouts";
import { SectionAbout, SectionHello } from "../src/sections";

export default function Home() {
  return (
    <LayoutLanding>
      <SectionHello />
      <SectionAbout />
    </LayoutLanding>
  );
}
