import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate as formatDate } from "../utils/formatDate.js";
import { Trash, Trash2, Trash2Icon } from "lucide-react";
const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        setSearchHistory(res.data.content);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getSearchHistory();
  }, []);

  if (searchHistory?.length === 0) {
    return (
      <div className="w-full h-screen text-white bg-black">
        <Navbar />
        <div className=" max-w-6xl mt-6 px-4 py-8">
          <h1 className=" font-bold text-4xl mt-3 text-center">
            Search History
          </h1>
          <div className="flex justify-center items-center h-48">
            <p className="text-xl">No search history found {""}....</p>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = async (item) => {
    try {
      await axios.delete(`/api/v1/search/history/${item.id}`);
      setSearchHistory(
        searchHistory.filter((history) => history.id != item.id)
      );
      toast.success("deleted successfully");
    } catch (error) {
      toast.error("failed to delete history");
    }
  };

  return (
    <div className="bg-black min-h-screen w-full text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-8 px-4 py-8   ">
        <h2 className="font-bold text-4xl text-center mb-14 p-auto">
          Search History
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 ">
          {searchHistory.map((item) => (
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-center gap-2 rounded-xl" key={item.id}>
              <img
                src={SMALL_IMG_BASE_URL + item.image}
                alt={item.title}
                className="rounded-full object-cover  mr-4 size-20"
              />
              <div className="flex flex-col gap-1  ">
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-sm text-white/70">
                  {formatDate(item.createdAt)}
                </p>
              </div>
              <span
                className={`px-1 py-0.5 rounded-md text-white font-bold text-sm ml-auto ${
                  item.searchType == "movie"
                    ? "bg-green-500"
                    : item.searchType == "tv"
                    ? "bg-blue-800"
                    : "bg-fuchsia-700"
                }`}
              >
                {item.searchType[0].toUpperCase() + item.searchType.slice(1)}
              </span>
              <button
                className="p-2 rounded-full hover:bg-red-500 "
                onClick={() => handleDelete(item)}
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
