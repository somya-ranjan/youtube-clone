"use client";
import React, { useState } from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchData } from "@/apis/axios";
import { Spinner } from "../loader";

function PlayListVideo({ data, errorMsg, playListId }) {
  const [response, setResponse] = useState({ data, errorMsg });
  const [videoList, setVideoList] = useState(data?.items);

  const fetchMoraData = async () => {
    try {
      const data = await fetchData(
        `playlistItems?part=snippet&order=date&playlistId=${playListId}&pageToken=${response?.data?.nextPageToken}`
      );
      if (data?.message) {
        setResponse({ data: {}, errorMsg: data?.message });
        setVideoList([]);
      } else {
        setResponse({
          data,
          errorMsg: data?.message,
        });
        setVideoList([...videoList, ...data?.items]);
      }
    } catch (error) {
      return error?.response?.data?.message || error?.message;
    }
  };
  return (
    <>
      {videoList?.length ? (
        <InfiniteScroll
          dataLength={videoList?.length}
          next={fetchMoraData}
          hasMore={videoList?.length < response?.data?.pageInfo?.totalResults}
          loader={<Spinner />}
          // height={650}
        >
          <div className="lg:ml-[365px] flex flex-col gap-y-4">
            {videoList?.map((item, i) => (
              <div
                className="flex flex-col sm:flex-row gap-x-4"
                key={Math.random()}
              >
                <p className="hidden text-sm-block text-sm self-center text-white/[0.6]">
                  {i + 1}
                </p>
                <Link
                  href={`/${item?.snippet?.resourceId?.videoId}`}
                  prefetch={false}
                >
                  <img
                    src={
                      item?.snippet?.thumbnails?.maxres?.url ||
                      item?.snippet?.thumbnails?.high?.url ||
                      item?.snippet?.thumbnails?.standard?.url ||
                      item?.snippet?.thumbnails?.medium?.url ||
                      item?.snippet?.thumbnails?.default?.url
                    }
                    alt="thumbnails"
                    className="h-[150px] min-h-[150px] sm:h-[100px] sm:min-h-[100px] w-full min-w-full sm:w-[180px] sm:min-w-[180px] rounded-xl"
                  />
                </Link>
                <div className="flex flex-col gap-y-1 sm:gap-y-3 text-sm ms:text-[20px]">
                  <p>{item?.snippet?.title}</p>
                  <p className="text-[12px] text-white/[0.6]">
                    <Link
                      href={`/chanel/${item?.snippet?.videoOwnerChannelId}`}
                      prefetch={false}
                    >
                      {item?.snippet?.videoOwnerChannelTitle}
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="h-[500px] grow flex justify-center items-center text-white/[0.5]">
          <p className="text-center">
            {response?.errorMsg ||
              `Opps! Something went wrong. Please try again`}
          </p>
        </div>
      )}
    </>
  );
}

export default PlayListVideo;
