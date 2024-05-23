import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-2 m-2 shadow-md ">
      <div className="flex col-span-1 ">
        <img
          onClick={toggleMenuHandler}
          className="h-10 cursor-pointer hover:bg-gray-200 hover:rounded-full"
          src="https://www.svgrepo.com/show/312300/hamburger-menu.svg"
          alt="hamburger-menu"
        />

        <a href="/">
          <img
            className="h-10 mx-4 mr-1 w-22"
            src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png"
            alt="logo"
          />
        </a>
        <span className="text-slate-500">
          <sup>IN</sup>
        </span>
      </div>
      <div className="col-span-10  px-12">
        <div>
          <input
            className="w-1/2 p-2 px-10  border border-gray-300 rounded-l-full"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button
            title="Search"
            className=" py-2 px-5 border border-gray-300 rounded-r-full bg-gray-200"
          >
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className=" absolute bg-white mx-4 my-[0.1rem] py-2 px-6 w-[26rem] rounded-xl font-mono shadow-md border border-gray-200 ">
            <ul>
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="text-lg font-normal pb-1 hover:bg-gray-100 hover:rounded-lg "
                >
                  <span className="pr-4">🔍</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Head;
