import { fetchData } from "@/apis/axios";
import SearchResults from "@/components/infiniteComponents/SearchResults";

async function searchVideoList(searchQuery) {
  try {
    const data = await fetchData(`search?part=snippet&q=${searchQuery}`);
    return data;
  } catch (error) {
    return error?.response?.data?.message || error?.message;
  }
}
async function SearchVideos({ params }) {
  const { searchQuery } = params;
  const response = await searchVideoList(decodeURIComponent(searchQuery));

  return (
    <section className="main_wrapper p-4">
      <SearchResults
        data={response?.items?.length && response}
        errorMsg={response?.message}
        searchQuery={decodeURIComponent(searchQuery)}
      />
    </section>
  );
}

export default SearchVideos;
