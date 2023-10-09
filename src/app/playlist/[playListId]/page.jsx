import axiosMain, { fetchData } from "@/apis/axios";
import PlayListVideo from "@/components/infiniteComponents/PlayListVideo";
import moment from "moment";
import Link from "next/link";

async function getPlayListDetail(playListId) {
  try {
    let data = await axiosMain.get(
      `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/playlists?part=snippet&id=${playListId}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
async function getPlayListVideo(playListId) {
  try {
    const data = await fetchData(
      `playlistItems?part=snippet&order=date&playlistId=${playListId}`
    );
    return data;
  } catch (error) {
    return error?.response?.data?.message || error?.message;
  }
}

async function PlayList({ params }) {
  const { playListId } = params;
  const playListDetails = await getPlayListDetail(playListId);
  const playListVideoList = await getPlayListVideo(playListId);

  return (
    <section className="flex flex-col gap-y-5 lg:flex-row p-5">
      <div className="lg:fixed h-[87%] lg:w-[340px] p-5 bg-gradient-to-t from-gray-700 via-gray-900 to-black rounded-2xl">
        <div className="flex flex-col sm:flex-row lg:flex-col gap-x-5 gap-y-5">
          <Link
            href={`/${playListVideoList?.data?.items?.[0]?.snippet?.resourceId?.videoId}`}
          >
            <img
              src={
                playListDetails?.data?.items?.[0]?.snippet?.thumbnails?.maxres
                  ?.url ||
                playListDetails?.data?.items?.[0]?.snippet?.thumbnails?.high
                  ?.url ||
                playListDetails?.data?.items?.[0]?.snippet?.thumbnails?.standard
                  ?.url ||
                playListDetails?.data?.items?.[0]?.snippet?.thumbnails?.medium
                  ?.url ||
                playListDetails?.data?.items?.[0]?.snippet?.thumbnails?.default
                  ?.url
              }
              alt="thumbnails"
              className="h-[120px] min-h-[120px] sm:h-[100px] sm:min-h-[100px] lg:h-[160px] lg:min-h-[160px] w-[250px] min-w-[250px] sm:w-[180px] sm:min-w-[180px] lg:w-[300px] lg:min-w-[300px] rounded-2xl"
            />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-[16px] sm:text-2xl font-bold">
              {playListDetails?.data?.items?.[0]?.snippet?.title}
            </h2>
            <p className="mt-4 mb-1 text-[12px] sm:text-sm">
              {playListDetails?.data?.items?.[0]?.snippet?.channelTitle}
            </p>
            <div className="flex gap-x-2 text-[12px] font-[500] text-white/[0.6]">
              <p>{playListVideoList?.data?.pageInfo?.totalResults} videos</p>
              <p>No views</p>
              <p className="break-words">
                Last updated on{" "}
                {moment(
                  playListVideoList?.data?.items?.[0]?.snippet?.publishedAt
                ).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PlayListVideo
        playListId={playListId}
        data={playListVideoList?.items?.length && playListVideoList}
        errorMsg={playListVideoList?.message}
      />
    </section>
  );
}

export default PlayList;
