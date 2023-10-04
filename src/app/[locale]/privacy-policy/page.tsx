import { ApiService } from "@/service";
import { Article } from "@/components";

// @TODO - Add error handling

async function getData() {
  const res = await new ApiService().public.gdpr.get();

  return res;
}

export default async function Home() {
  const { data } = await getData();

  return (
    <main>
      <Article content={data?.content ?? ""} />
    </main>
  );
}
