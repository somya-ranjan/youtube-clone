"use client";
import { useContext } from "react";
import { categories } from "@/utils/constant";
import { CommonContext } from "@/context/contextApi";
import { useParams } from "next/navigation";
import NavItems from "./NavItems";
function SideBar() {
  // // initial state
  const params = useParams();
  const { search, setSearch, mobileMenu, setMobileMenu } =
    useContext(CommonContext);

  return (
    <>
      <section
        className={`w-[240px] overflow-y-auto h-full py-4 bg-[#0f0f0f] ${
          !params?.videoId && "md:fixed md:translate-x-0"
        } z-10 transition-all ${
          mobileMenu ? "translate-x-0 fixed" : "translate-x-[-240px] absolute"
        }`}
      >
        <div className="flex px-5 flex-col">
          {categories.map((item) => (
            <div key={Math.random()} onClick={() => setMobileMenu(false)}>
              <NavItems
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                type={item.type}
              />
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </div>
          ))}
          <hr className="my-5 border-white/[0.2]" />
          <div className="text-white/[0.5] text-[12px]">
            <a href="https://www.linkedin.com/in/somya-ranjan/" target="_blank">
              Clone by : Somyaranjan
            </a>
          </div>
        </div>
      </section>
      {mobileMenu && (
        <div
          className="w-[100vw] h-[100vh] fixed bg-black/[0.5] z-1"
          onClick={() => setMobileMenu(false)}
        />
      )}
    </>
  );
}

export default SideBar;
