import moment from "moment";
import Link from "next/link";
import { MdOutlinePlaylistPlay } from "react-icons/md";

function VideoCard({ video }) {
  return (
    <div className="flex flex-col mb-5">
      <Link
        href={
          video?.id?.videoId
            ? `/${video?.id?.videoId}`
            : video?.id?.channelId
            ? `/chanel/${video?.id?.channelId}`
            : `/playlist/${video?.id?.playlistId}`
        }
      >
        <div className="h-48 md:h-40 relative">
          <img
            className={
              video?.id?.channelId
                ? "h-40 w-40 rounded-full mx-auto"
                : "object-cover w-full h-full rounded-xl"
            }
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
      <div className="py-3">
        <p>{video?.snippet?.title}</p>
        <p className="mt-2 text-sm font-[500] text-[#808080]">
          <Link prefetch={false} href={`/chanel/${video?.snippet?.channelId}`}>
            {video?.snippet?.channelTitle}
          </Link>
        </p>
        <p className="text-sm mt-[2px] font-[500] text-[#808080]">
          {moment(
            new Date(video?.snippet?.publishedAt).toLocaleString()
          ).fromNow()}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
