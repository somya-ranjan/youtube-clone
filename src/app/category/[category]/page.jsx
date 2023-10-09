import { fetchData } from "@/apis/axios";
import Category from "@/components/infiniteComponents/Category";

async function videosCategory(category) {
  try {
    const data = await fetchData(
      `search?part=snippet&order=${
        category === "Trending" ? "rating" : "viewCount"
      }&q=${category}`
    );
    return data;
  } catch (error) {
    return error?.response?.data?.message || error?.message;
  }
}

async function CategoryVideos({ params }) {
  const { category } = params;
  const response = await videosCategory(decodeURIComponent(category));
  return (
    <section className="main_wrapper">
      <Category
        data={response?.items?.length && response}
        errorMsg={response?.message}
        category={decodeURIComponent(category)}
      />
    </section>
  );
}

export default CategoryVideos;
