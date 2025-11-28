import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent.jsx";
import {
  MOVIE_CATAGORIES,
  TV_CATAGORIES,
  ORIGINAL_IMG_BASE_URL,
} from "../../utils/constants.js";
import "../../../src/index.css";
import { useContentStore } from "../../store/content.js";
import ContentSlider from "../../components/ContentSlider.jsx";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  const [imgLoading, setImgLoading] = useState(true);

  if (!trendingContent)
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 h-full w-full   bg-black/70 flex justify-center items-center -z-10 shimmer " />
      </div>
    );

  return (
    <>
      <div className="relative h-screen text-white ">
        <Navbar />
        {imgLoading && (
          <div className="absolute top-0 left-0 h-full w-full   bg-black/70 flex justify-center items-center -z-10 shimmer " />
        )}
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="home-img"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => setImgLoading(false)}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/55 -z-50"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-1 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}
              | {trendingContent?.adult ? " 18 +" : "PG-13"}
            </p>
            <p className="mt-3 text-balance font-mono">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>
          <div className="flex justify-start items-center gap-4 mt-10">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="flex items-center gap-2 bg-white text-black py-2 px-4 rounded-md hover:bg-white/70"
            >
              <Play className=" mr-2 fill-black size-6" />
              Play
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="flex items-center gap-2 bg-gray-600/50 text-white py-2 px-4 rounded-md hover:bg-gray-500"
            >
              More Info
              <Info className="bg-transparent mr-2 fill-black size-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 gap-5 bg-black/90 ">
        {contentType === "movie"
          ? MOVIE_CATAGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))
          : TV_CATAGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
