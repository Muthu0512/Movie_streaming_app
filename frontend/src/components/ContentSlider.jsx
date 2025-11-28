import React, { useRef } from "react";
import { useContentStore } from "../store/content.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants.js";
import {ChevronLeftCircle, ChevronRightCircle } from "lucide-react"

const ContentSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef(null)

  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", "  ").slice(1);

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };
    getContent();
  }, [category, contentType]);

  const scrollLeft=()=>{
    if(sliderRef.current){
      sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior:'smooth' })
    }
  }

  const scrollRight=()=>{
    sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth,behavior:"smooth"})
  }
  return (
    <>
      <div
        className="bg-black text-white relative px-5 md:px-16 " 
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <h2 className="my-4 text-2xl font-bold font-mono">
          {formattedCategoryName} {formattedContentType}
        </h2>
        <div className="flex px-2 py-4 border rounded-lg overflow-x-scroll scrollbar-hide" ref={sliderRef}>
          {content.map((item) => (
            <Link
              to={`/watch/${item.id}`}
              key={item.id}
              className="px-4 min-w-[250px]  relative group "
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path}
                  alt="content_IMG"
                  className=" transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="text-center mt-4">{item.name || item.title}</p>
            </Link>
          ))}
        </div>
        {showArrows && (
          <>
            <button className=" absolute bg-black bg-opacity-60 hover:bg-opacity-80 size-14 
            rounded-full top-1/2 -translate-y-[100%] left-4 md:left-20 flex justify-center items-center  text-white z-10" onClick={scrollLeft}>
              <ChevronLeftCircle className="size-8" > </ChevronLeftCircle>
            </button>
            <button className=" absolute bg-black bg-opacity-60 hover:bg-opacity-80 size-14 
            rounded-full top-1/2 -translate-y-[100%] right-4 md:right-20 flex justify-center items-center  text-white z-10" onClick={scrollRight}>
              <ChevronRightCircle className="size-8"> </ChevronRightCircle>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ContentSlider;
