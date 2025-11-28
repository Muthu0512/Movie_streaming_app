import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useContentStore } from "../store/content";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const { setContentType } = useContentStore();

  function handleTabClick(tab) {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);

      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Nothing found ");
      } else {
        toast.error("an error occured please try again");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center  gap-3  mt-4">
          <button
            className={` rounded-md px-4 py-2 ${
              activeTab === "movie" ? "bg-red-700" : "bg-gray-800"
            } hover:bg-red-400`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={` rounded-md px-4 py-2 ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-400`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={` rounded-md px-4 py-2 ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-400`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>
        <form
          className="flex gap-2 items-stretch max-w-2xl mx-auto my-10"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="bg-gray-600 text-white w-full  p-2 rounded-md"
            placeholder={`search for a ` + activeTab}
          />
          <button className="bg-red-600 text-white  p-2 rounded-xl ">
            <Search className="size-8 " />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {results.map((result) => {
          if (!result.poster_path && !result.profile_path) return null;

          return (
            <div className="bg-gray-700 rounded p-4" key={result.id}>
              {activeTab === "person" ? (
                <div className="flex flex-col items-center">
                  <img
                    src={SMALL_IMG_BASE_URL + result?.profile_path}
                    alt={result?.name}
                    className="max-h-72 rounded mx-auto"
                  />
                  <h3 className="text-2xl font-bold text-center">
                    {result?.name}
                  </h3>
                </div>
              ) : (
                <Link
                  to={`/watch/${result.id}`}
                  className="flex flex-col items-center"
                  onClick={() => {
                    setContentType(activeTab);
                  }}
                >
                  <img
                    src={SMALL_IMG_BASE_URL + result?.poster_path}
                    alt={result?.name || result?.title}
                    className="max-h-72 rounded mx-auto"
                  />
                  <h3 className="text-2xl font-bold text-center">
                    {result?.name || result?.title}
                  </h3>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
