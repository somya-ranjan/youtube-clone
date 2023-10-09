"use client";
import { useParams } from "next/navigation";

function MainLayouts({ children }) {
  const params = useParams();
  return (
    <div className={`grow ${!params?.videoId && "md:ml-[240px]"}`}>
      {children}
    </div>
  );
}

export default MainLayouts;
