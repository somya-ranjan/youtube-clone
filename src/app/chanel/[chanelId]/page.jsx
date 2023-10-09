import axiosMain, { fetchData } from "@/apis/axios";
import { abbreviateNumber } from "js-abbreviation-number";
import { AiOutlineEye } from "react-icons/ai";
import ChanelVideoList from "@/components/infiniteComponents/ChanelVideoList";

async function getChannelDetail(chanelId) {
  try {
    let data = await axiosMain.get(
      `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/channels?part=snippet&id=${chanelId}`
    );
    return data;
  } catch (error) {
    return error?.data?.error?.message;
  }
}
async function getChannelVideo(chanelId) {
  try {
    const data = await fetchData(
      `search?part=snippet&order=date&channelId=${chanelId}`
    );
    return data;
  } catch (error) {
    return error?.response?.data?.message || error?.message;
  }
}

async function ChanelDetails({ params }) {
  const { chanelId } = params;
  const chanelDetails = await getChannelDetail(chanelId);
  const chanelVideoList = await getChannelVideo(chanelId);

  return (
    <section className="main_wrapper">
      {chanelDetails?.data?.items?.[0]?.brandingSettings?.image
        ?.bannerExternalUrl && (
        <div className="mt-5">
          <img
            src={
              chanelDetails?.data?.items?.[0]?.brandingSettings?.image
                ?.bannerExternalUrl
            }
            className="w-[100%] h-[90px] sm:h-[140px] md:h-[160px] lg:h-[190px] xl:h-[208px] object-cover overflow-hidden"
          />
        </div>
      )}

      <div className="grow flex justify-between my-5 px-5">
        <div className="grow flex gap-x-4 ">
          <img
            src={chanelDetails?.data?.items?.[0].snippet?.thumbnails?.high?.url}
            className="h-32 w-32 rounded-full hidden md:block"
          />
          <div className="flex flex-col gap-y-2 mt-2 lg:max-w-[700px] xl:max-w[1000]">
            <p className="text-2xl">
              {chanelDetails?.data?.items?.[0].brandingSettings?.channel?.title}
            </p>
            <div className="flex gap-x-4 text-sm text-white/[0.5]">
              <p> {chanelDetails?.data?.items?.[0].snippet?.customUrl}</p>
              <p>
                {`${abbreviateNumber(
                  chanelDetails?.data?.items?.[0].statistics?.subscriberCount,
                  2
                )} Subscribers`}
              </p>
              <p>
                {`${abbreviateNumber(
                  chanelDetails?.data?.items?.[0].statistics?.videoCount,
                  2
                )} Videos`}
              </p>
            </div>
            <p className="text-white/[0.5] text-sm">
              {
                chanelDetails?.data?.items?.[0].brandingSettings?.channel
                  ?.description
              }
            </p>
          </div>
        </div>

        <div className="items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] hidden sm:flex md:hidden lg:flex">
          <AiOutlineEye className="text-xl text-white mr-2" />
          {`${abbreviateNumber(
            chanelDetails?.data?.items?.[0].statistics?.viewCount,
            2
          )} Views`}
        </div>
      </div>

      <ChanelVideoList
        data={chanelVideoList?.items?.length && chanelVideoList}
        errorMsg={chanelVideoList?.message}
        chanelId={chanelId}
      />
    </section>
  );
}

export default ChanelDetails;
