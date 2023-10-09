import { Footer, TopBar } from "@/components";
import { SectionHero } from "@/app/[locale]/download/_section";

// @TODO: Add dynamic country code to the URL
// @TODO: Add dynamic QR Code generator
// @TODO: Add redirect when detected mobile device

const APPSTORE_URL = "https://apps.apple.com/gb/app/wolfie/id6444870861";
const PLAYSTORE_URL = null;

export default function Page() {
  return (
    <>
      <TopBar />
      <main className="flex flex-col justify-center min-h-screen bg-white">
        <SectionHero appStoreUrl={APPSTORE_URL} playStoreUrl={PLAYSTORE_URL} />
      </main>
      <Footer />
    </>
  );
}
