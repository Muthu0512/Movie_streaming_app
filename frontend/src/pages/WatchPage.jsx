import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContentStore } from "../store/content";
import axios from "axios";
import { ChevronLeft, ChevronRight, Frown, HeartCrack } from "lucide-react";
import ReactPlayer from "react-player";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/formatDate.js";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton.jsx";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [similarContent, setSimilarContent] = useState([]);
  const [contentDetails, setContentDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContentDetails(res.data.details);
      } catch (error) {
        if (error.message.includes("404")) {
          setContentDetails(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);
  function handlePrev() {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx(currentTrailerIdx - 1);
    }
  }
  function handleNext() {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx(currentTrailerIdx + 1);
    }
  }

  

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  if (loading)
    return (
      <div className="w-full min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!contentDetails) {
    return (
      <div className="h-screen w-full bg-black text-white">
        <div className="max-w-6xl h-full ">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-32  ">
            <h2 className=" font-bold text:2xl sm:text-5xl text-nowrap">
              {" "}
              No Contents Found......{" "}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen w-full">
      <div className="mx-auto container px-4 py-10 h-full ">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center x-4">
            <button
              className={`bg-gray-700/60 hover:bg-gray-700 text-white px-5 py-2 rounded-lg ${
                currentTrailerIdx === 0 ? "opacity-40 cursor-not-allowed  " : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={`bg-gray-700/60 hover:bg-gray-700 text-white px-5 py-2 rounded-lg ${
                currentTrailerIdx === trailers.length - 1
                  ? "opacity-40 cursor-not-allowed  "
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-4 p-2  px-20 flex justify-center">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width="80%"
              height={"70vh"}
              src={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
              className="rounded-xl mx-auto overflow-hidden"
            />
          )}
          {trailers?.length === 0 && (
            <h2 className="text-center text-2xl text-white font-semibold mt-4">
              No trailers found for {""} <br />
              <span className=" text-center text-4xl font-bold text-red-700">
                {contentDetails?.name || contentDetails?.title} {""}{" "}
                <Frown className="inline-block" />
              </span>
            </h2>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 sm:gap-28 max-w-6xl px-20 mb-4 md:mb-8 ">
          <div className="flex flex-col font-white text-center">
            <h2 className="text-5xl font-bold mb-4 text-balance">
              {contentDetails?.name || contentDetails?.title}
            </h2>
            <p className="mb-4 text-lg text-balance">
              {formatReleaseDate(
                contentDetails?.release_date || contentDetails?.first_air_date
              )}{" "}
              | {""}
              {contentDetails?.adult ? (
                <span className="text-red-700">18+</span>
              ) : (
                <span className="text-green-700">PG - 13</span>
              )}
              {""}
            </p>

            <p className="text-xl font-light"> {contentDetails?.overview}</p>
          </div>
          <img
            src={SMALL_IMG_BASE_URL + contentDetails?.poster_path}
            alt="poster_IMG"
            className="max-h-[500px] rounded-lg"
          />
        </div>
        {similarContent?.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto px-auto relative">
            <h2 className="text-4xl my-8 font-bold text-center">
              Similar Movies / TV Shows
            </h2>
            <div
              className="flex gap-6 overflow-x-scroll scrollbar-hide   "
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content?.poster_path == null) return null;
                return (
                  <Link
                    to={`/watch/${content.id}`}
                    key={content.id}
                    className="w-52 flex-none group"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content?.poster_path}
                      className="w-90% h-auto rounded-lg group-hover:scale-95 transform-all duration-300"
                    />
                    <h4 className="text-center font-bold text-lg pt-4">
                      {content?.name || content?.title}
                    </h4>
                  </Link>
                );
              })}
            </div>
            <>
              <button
                className=" absolute bg-black bg-opacity-60 hover:bg-opacity-100 size-14 
            rounded-full top-1/2 -translate-y-[50%]  md:-translate-y-[100%] left-0 md:left-10 flex justify-center items-center  text-red-600 z-10"
                onClick={scrollLeft}
              >
                <ChevronLeft className="size-6 md:size-14"> </ChevronLeft>
              </button>
              <button
                className=" absolute bg-black bg-opacity-60 hover:bg-opacity-100 size-14 
            rounded-full top-1/2 -translate-y-[50%] md:-translate-y-[100%] right-0 md:right-10 flex justify-center items-center  text-red-600 z-10"
                onClick={scrollRight}
              >
                <ChevronRight className="size-6 md:size-14"> </ChevronRight>
              </button>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
