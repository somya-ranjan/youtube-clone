import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";

function NavItems(props) {
  const currentParams = useParams();
  const { text, icon, type } = props;
  return (
    <Link
      prefetch={false}
      href={type === "home" ? "/" : `/category/${text}`}
      className={`text-white text-sm h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] ${
        type === "menu" ? "cursor-not-allowed" : "cursor-pointer"
      } ${
        text === decodeURIComponent(currentParams.category) ||
        (type === "home" && JSON.stringify(currentParams) === "{}")
          ? "bg-white/[0.15]"
          : ""
      }`}
    >
      <span className="text-xl mr-5">{icon}</span>
      {text}
    </Link>
  );
}

export default NavItems;
