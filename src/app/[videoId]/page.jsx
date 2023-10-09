"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axiosMain from "@/apis/axios";
import Link from "next/link";
import { AiOutlineEye, AiOutlineLike } from "react-icons/ai";
import SuggestionVideoCard from "@/components/SuggestionVideoCard";
import { abbreviateNumber } from "js-abbreviation-number";

function VideoDetails({ params }) {
  const { videoId } = params;
  const [videoDetails, setVideoDetails] = useState({
    data: "",
    isLoading: true,
  });
  const [suggestVideo, setSuggestVideo] = useState({
    data: "",
    isLoading: true,
  });
  const [isClint, setClient] = useState(false);

  const getVideosDetails = async (id) => {
    try {
      let data = await axiosMain.get(
        `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/videos?part=contentDetails,snippet,statistics&id=${id}`
      );
      setVideoDetails({ data: data, isLoading: false });
    } catch (error) {
      setVideoDetails({ data: [], isLoading: false });
    }
  };

  const getSuggestionsVideos = async (id) => {
    try {
      let data = await axiosMain.get(
        `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/search?part=id,snippet&relatedToVideoId=${id}&type=video`
      );
      setSuggestVideo({ data: data, isLoading: false });
    } catch (error) {
      setSuggestVideo({ data: [], isLoading: false });
    }
  };
  useEffect(() => {
    setClient(true);
    getVideosDetails(videoId);
    getSuggestionsVideos(videoId);
  }, [videoId]);

  return (
    <section className="flex justify-center flex-col lg:flex-row h-[calc(100%-56px)] px-5">
      <div className="w-full max-w-[1280px] flex flex-col lg-flex-row">
        <div className="flex flex-col lg:px-4 py-3 lg:py-6 overflow-y-auto rounded">
          <div className="h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] ml-[-16px] lg:ml-0 lg:mr-0 bg-[#000000]">
            {isClint && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width="100%"
                height="100%"
                playing={true}
                light={
                  <img
                    src={
                      videoDetails?.data?.data?.items?.[0]?.snippet?.thumbnails
                        ?.high?.url
                    }
                    height="100%"
                    width="100%"
                    className="object-cover overflow-hidden"
                    alt="Thumbnail"
                  />
                }
              />
            )}
          </div>
          <p className="text-sm md:text-xl mt-4">
            {videoDetails?.data?.data?.items?.[0]?.snippet?.title}
          </p>
          <div className="flex justify-between items-center flex-wrap gap-y-2 mt-4">
            <Link
              prefetch={false}
              href={`/chanel/${videoDetails?.data?.data?.items?.[0]?.snippet?.channelId}`}
              className="text-sm md:text-base"
            >
              {videoDetails?.data?.data?.items?.[0]?.snippet?.channelTitle}
            </Link>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-white text-sm md:text-md">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {`${abbreviateNumber(
                  videoDetails?.data?.data?.items?.[0]?.statistics?.likeCount,
                  2
                )} Likes`}
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineEye className="text-xl text-white mr-2" />
                {`${abbreviateNumber(
                  videoDetails?.data?.data?.items?.[0]?.statistics?.viewCount,
                  2
                )} Views`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-6 lg:px-4 lg:w-[520px] xl:w-[550px]">
        {suggestVideo.data?.data?.items?.map((item) => (
          <SuggestionVideoCard videos={item} key={Math.random()} />
        ))}
      </div>
    </section>
  );
}

export default VideoDetails;
