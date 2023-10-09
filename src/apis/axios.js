import axios from "axios";

const axiosMain = axios.create({
  params: {
    // part: "snippet,id",
    // regionCode: "US",
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
export default axiosMain;

export const fetchData = async (endPoint) => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/${endPoint}&maxResults=50`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      }
    );
    const data = await resp?.json();
    return data;
  } catch (error) {
    return error?.response?.data?.message || error?.message;
  }
};
