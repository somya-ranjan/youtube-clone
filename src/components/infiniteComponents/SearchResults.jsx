"use client";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchData } from "@/apis/axios";
import SearchVideoCard from "../SearchVideoCard";
import { Spinner } from "../loader";

function SearchResults({ data, errorMsg, searchQuery }) {
  const [response, setResponse] = useState({ data, errorMsg });
  const [videoList, setVideoList] = useState(data?.items);

  const fetchMoraData = async () => {
    try {
      const data = await fetchData(
        `search?part=snippet&q=${searchQuery}&pageToken=${response?.data?.nextPageToken}`
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
          <div className="flex flex-col gap-y-7">
            {videoList.map((item) => (
              <SearchVideoCard key={Math.random()} video={item} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="h-[500px] grow flex justify-center items-center text-white/[0.5]">
          <p className="text-center">
            {response?.errorMsg || !videoList?.length
              ? "Video not found"
              : `Opps! Something went wrong. Please try again`}
          </p>
        </div>
      )}
    </>
  );
}

export default SearchResults;
