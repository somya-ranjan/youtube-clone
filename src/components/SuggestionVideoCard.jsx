import moment from "moment";
import Link from "next/link";
import { trimString } from "@/lib";

function SuggestionVideoCard({ videos }) {
  return (
    <div className="flex mb-3">
      <Link
        prefetch={false}
        href={
          videos?.id?.videoId
            ? `/${videos?.id?.videoId}`
            : videos?.id?.channelId
            ? `/chanel/${videos?.id?.channelId}`
            : `/playlist/${videos?.id?.playlistId}`
        }
      >
        <div className="h-24 md:h-20 xl:h-24 w-40 min-w[160px] lg:w-32 lg:min-w[128px] xl:w-40 xl-min-w[168px]">
          <img
            className="object-cover w-full h-full"
            src={
              videos?.snippet?.thumbnails?.high?.url ||
              videos?.snippet?.thumbnails?.standard?.url ||
              videos?.snippet?.thumbnails?.medium?.url ||
              videos?.snippet?.thumbnails?.default?.url
            }
            alt="tumbles"
          />
        </div>
      </Link>
      <div className="pl-4">
        <p className="sm:hidden lg:block text-[13px]">
          {trimString(videos?.snippet?.title, 40)}
        </p>
        <p className="sm:hidden lg:block mt-2 text-sm font-[500] text-[#808080]">
          <Link prefetch={false} href={`/chanel/${videos?.snippet?.channelId}`}>
            {trimString(videos?.snippet?.channelTitle, 19)}
          </Link>
        </p>
        <p className="hidden sm:block lg:hidden text-[13px]">
          {trimString(videos?.snippet?.title, 200)}
        </p>
        <p className="hidden sm:block lg:hidden mt-2 text-sm font-[500] text-[#808080]">
          <Link prefetch={false} href={`/chanel/${videos?.snippet?.channelId}`}>
            {trimString(videos?.snippet?.channelTitle, 100)}
          </Link>
        </p>
        <p className="text-sm mt-[2px] font-[500] text-[#808080]">
          {moment(
            new Date(videos?.snippet?.publishedAt).toLocaleString()
          ).fromNow()}
        </p>
      </div>
    </div>
  );
}

export default SuggestionVideoCard;
