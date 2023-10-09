import moment from "moment";

export const VideoLength = ({ time }) => {
  const videoLengthInSeconds = moment()
    .startOf("day")
    .seconds(time)
    .format("H:mm:ss");
  return (
    <div className="absolute bottom-2 right-2 py-1 px-2 text-xs bg-black rounded-md">
      {videoLengthInSeconds}
    </div>
  );
};

export const trimString = (string, range = 20) => {
  if (string?.length > range) {
    return `${string?.slice(0, range)} ...`;
  } else {
    return string;
  }
};
