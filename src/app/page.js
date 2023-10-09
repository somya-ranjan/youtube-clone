import { fetchData } from "@/apis/axios";
import Feeds from "@/components/infiniteComponents/Feeds";

async function videosList() {
  try {
    const data = await fetchData(`search?part=snippet,id&q=New`);
    return data;
  } catch (error) {
    return error?.response?.data?.message || error?.message;
  }
}

async function Home() {
  const response = await videosList();
  return (
    <section className="main_wrapper">
      <Feeds
        data={response?.items?.length && response}
        errorMsg={response?.message}
      />
    </section>
  );
}
export default Home;
