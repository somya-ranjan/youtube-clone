import Link from "next/link";
import moment from "moment";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { trimString } from "@/lib";

function SearchVideoCard({ video }) {
  return (
    <div className="flex">
      <Link
        prefetch={false}
        href={
          video?.id?.videoId
            ? `/${video?.id?.videoId}`
            : video?.id?.channelId
            ? `/chanel/${video?.id?.channelId}`
            : `/playlist/${video?.id?.playlistId}`
        }
      >
        <div
          className={
            video?.id?.channelId
              ? "h-24 sm:h-34 md:h-28 lg:h-40 xl:h-44 w-24 sm:w-34 md:w-28 lg:w-40 xl:w-44"
              : "h-35 sm:h-44 md:h-28 lg:h-40 xl:h-48 min-w[180px] w-40 sm:w-72 md:w-56 lg:w-80 xl:w-96 relative"
          }
        >
          <img
            className={`object-cover w-full h-full ${
              video?.id?.channelId ? "rounded-full" : "rounded-xl"
            }`}
            src={
              video?.snippet?.thumbnails?.high?.url ||
              video?.snippet?.thumbnails?.standard?.url ||
              video?.snippet?.thumbnails?.medium?.url ||
              video?.snippet?.thumbnails?.default?.url
            }
            alt="tumbles"
          />
          {video?.id?.playlistId && (
            <div className="absolute bottom-0 bg-black/[0.7] w-full rounded-b-xl">
              <MdOutlinePlaylistPlay className="text-2xl ml-2" />
            </div>
          )}
        </div>
      </Link>
      <div className="pl-4 lg:pr-10">
        <p className="sm:hidden text-[13px]">
          {trimString(video?.snippet?.title, 40)}
        </p>
        <p className="hidden sm:block text-[16px] lg:text-[18px]">
          {trimString(video?.snippet?.title, 200)}
        </p>
        <p className="text-sm mt-[2px] font-[500] text-[#808080]">
          {moment(
            new Date(video?.snippet?.publishedAt).toLocaleString()
          ).fromNow()}
        </p>
        <p className="sm:hidden mt-2 text-sm font-[500] text-[#808080]">
          <Link prefetch={false} href={`/chanel/${video?.snippet?.channelId}`}>
            {trimString(video?.snippet?.channelTitle, 19)}
          </Link>
        </p>
        <p className="hidden sm:block mt-2 text-sm font-[500] text-[#808080]">
          <Link prefetch={false} href={`/chanel/${video?.snippet?.channelId}`}>
            {trimString(video?.snippet?.channelTitle, 100)}
          </Link>
        </p>
        <p className="sm:hidden mt-2 text-sm font-[500] text-[#808080]">
          {trimString(video?.snippet?.description, 50)}
        </p>{" "}
        <p className="hidden sm:block mt-2 text-sm font-[500] text-[#808080]">
          {trimString(video?.snippet?.description, 200)}
        </p>
      </div>
    </div>
  );
}

export default SearchVideoCard;
