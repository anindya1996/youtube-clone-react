import React from "react";

// Function to format view count
const formatViewCount = (viewCount) => {
  if (viewCount >= 1000000) {
    return Math.floor(viewCount / 1000000) + "M";
  } else if (viewCount >= 1000) {
    return Math.floor(viewCount / 1000) + "K";
  } else {
    return viewCount;
  }
};

const VideoCard = ({ info }) => {
  // console.log(info);
  if (!info) {
    return <div>Loading...</div>;
  }

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-2 m-3 w-64 cursor-pointer rounded-2xl ">
      <img className="rounded-2xl" src={thumbnails?.medium?.url} alt={title} />
      <ul>
        <li className="font-bold text-sm py-2">{title}</li>
        <li className="text-gray-500">{channelTitle}</li>
        <li className="text-gray-500">
          {formatViewCount(statistics.viewCount)} views
        </li>
      </ul>
    </div>
  );
};

export default VideoCard;
