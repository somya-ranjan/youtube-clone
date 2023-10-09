"use client";
import { useContext, useEffect, useState } from "react";
import { CommonContext } from "@/context/contextApi";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CgMenu } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";

function Header() {
  // // initial state
  const navigate = useRouter();
  const params = useParams();
  const { search, setSearch, mobileMenu, setMobileMenu } =
    useContext(CommonContext);

  // // local state
  const [searchQuery, setSearchQuery] = useState("");

  // // function
  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate.push(`/search-result/${searchQuery}`);
    }
  };
  const handelToggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [mobileMenu]);
  return (
    <header className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-[#0f0f0f] text-white">
      <div className="flex h-5 items-center">
        <div
          className={`flex ${
            !params?.videoId && "md:hidden"
          } items-center justify-center mr-2 md:mr-6 cursor-pointer h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]`}
          onClick={handelToggleMobileMenu}
        >
          <CgMenu className="text-white text-xl" />
        </div>
        <Link href="/" prefetch={false} onClick={() => setMobileMenu(false)}>
          <Image
            className="h-full hidden dark:sm:block"
            src="/yt-logo.png"
            alt="YouTube"
            width={100}
            height={30}
          />
          <Image
            className="h-full sm:hidden"
            src="/yt-logo-mobile.png"
            alt="YouTube"
            height={30}
            width={30}
          />
        </Link>
      </div>
      <div
        className="group flex items-center"
        onClick={() => setMobileMenu(false)}
      >
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:flex">
            <IoIosSearch className="text-white text-xl" />
          </div>
          <input
            type="search"
            placeholder="Search"
            className="bg-transparent outline-none text-white pr-5 pl-4 md:pl-0 w-44 md:w-64 lg:w-[500px] md:group-focus-within:pl-0"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
          />
        </div>
        <button
          className="flex items-center justify-center w-[40px] md:w-[60px] h-8 md:h-10 border border-l0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <IoIosSearch className="text-white text-xl" />
        </button>
      </div>
      <div
        className="hidden md:flex items-center"
        onClick={() => setMobileMenu(false)}
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bf-[#303030]/[0.6]">
          <RiVideoAddLine className="text-center text-white cursor-not-allowed" />
        </div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bf-[#303030]/[0.6]">
          <FiBell className="text-center text-white cursor-not-allowed" />
        </div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full cursor-no-drop">
          <Image
            className="rounded-full bg-cover"
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt="profile pic"
            height={30}
            width={30}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
