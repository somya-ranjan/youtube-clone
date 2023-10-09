"use client";
import { createContext, useState } from "react";

export const CommonContext = createContext();

export const AppContext = (props) => {
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <CommonContext.Provider
      value={{ search, setSearch, mobileMenu, setMobileMenu }}
    >
      {props.children}
    </CommonContext.Provider>
  );
};
