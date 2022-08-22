import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  MdDehaze,
  MdLightMode,
  MdModeNight,
  MdChevronLeft,
} from "react-icons/md";
import Logo from "../../assets/img/logo-petdopter.png";
import { ThemeContext } from "../../utils/context";

export default function TitlePage({ page = "Title" }) {
  const router = useRouter();
  const { theme, setTheme } = useContext(ThemeContext);
  const handleTheme = (mode) => {
    setTheme(mode);
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 lg:border-b-4 border-black dark:border-white md:py-2">
      <div className="flex items-center">
        {page === "Discover" ? (
          <div className="md:hidden mr-2">
            <Image src={Logo} alt="Logo" width={25} height={35} />
          </div>
        ) : (
          <button onClick={() => router.back()}>
            <MdChevronLeft size={35} />
          </button>
        )}
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">{page}</h1>
      </div>
      <div className={`${page === "Discover" ? "block" : "hidden"}`}>
        <Link href="/meetings/myinvitations">
          <a>
            <div className="md:hidden">
              <MdDehaze size={25} />
            </div>
            <div className="hidden md:block">
              <MdDehaze size={35} />
            </div>
          </a>
        </Link>
      </div>
      {page === "More" ? (
        <div className="block py-2 md:hidden">
          {theme === "light" ? (
            <div
              onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
              className="w-12 h-6 shadow-lg rounded-3xl flex items-center"
            >
              <MdLightMode className="ml-2" size={20} />
            </div>
          ) : (
            <div
              onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
              className="w-12 h-6 shadow-lg bg-[#CDA000] rounded-3xl flex items-center relative overflow-hidden"
            >
              <MdModeNight className="ml-6" size={20} />
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
