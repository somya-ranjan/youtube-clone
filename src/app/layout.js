// "use client";
import { AppContext } from "@/context/contextApi";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
// import { useParams } from "next/navigation";
import MainLayouts from "@/components/MainLayouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YouTube",
  description: "YouTube clone by Somyaranjan",
};

export default function RootLayout({ children }) {
  // const params = useParams();
  return (
    <html lang="en">
      <AppContext>
        <body className={inter.className}>
          <main className="flex flex-col h-full">
            <Header />
            <div className="flex flex-row">
              <SideBar />
              {/* <div className={`grow ${!params?.videoId && "md:ml-[240px]"}`}>
                {children}
              </div> */}
              <MainLayouts>{children}</MainLayouts>
            </div>
          </main>
        </body>
      </AppContext>
    </html>
  );
}
