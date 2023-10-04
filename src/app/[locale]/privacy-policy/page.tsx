import { ApiService } from "@/service";
import { Article, Footer, TopBar } from "@/components";

// @TODO - Add error handling

async function getData() {
  const res = await new ApiService().public.gdpr.get();

  return res;
}

export default async function Home() {
  const { data } = await getData();

  return (
    <>
      <TopBar />
      <main>
        <Article content={data?.content ?? ""} />
      </main>
      <Footer />
    </>
  );
}
