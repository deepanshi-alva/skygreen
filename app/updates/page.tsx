// app/updates/page.tsx
import { fetchNewsEventsBlogs } from "@/lib/strapiData";
import UpdatesPage from "@/components/updates/UpdatesPage";

export default async function Updates() {
  const data = await fetchNewsEventsBlogs(); // fetch from Strapi
  return <UpdatesPage data={data} />;
}
