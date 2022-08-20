import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "../../assets/img/text-logo-petdopter.png";
import {
  MdOutlineHome,
  MdPets,
  MdMoreHoriz,
  MdMoreVert,
  MdOutlineAccountCircle,
  MdLightMode,
  MdModeNight,
} from "react-icons/md";
import { ThemeContext } from "../../utils/context";

export default function Header() {
  const router = useRouter();
  const { route } = router;

  const { theme, setTheme } = useContext(ThemeContext);
  const handleTheme = (mode) => {
    setTheme(mode);
  };

  return (
    <header className="w-full bg-white dark:bg-black text-black dark:text-white md:sticky md:top-0 md:z-30">
      <div className="w-full bg-white dark:bg-black text-black dark:text-white fixed bottom-0 z-30 md:hidden h-16">
        <nav className="flex justify-around font-medium px-2">
          <Link href="/">
            <a
              className={`flex flex-col justify-center items-center ${
                route === "/" ? `text-[#FFC700] dark:text-[#CDA000]` : ""
              }`}
            >
              <MdOutlineHome size={30} className="inline" />
              <h3>Home</h3>
            </a>
          </Link>
          <Link href="/adoptions">
            <a
              className={`flex flex-col justify-center items-center ${
                route === "/adoptions"
                  ? `text-[#FFC700] dark:text-[#CDA000]`
                  : ""
              }`}
            >
              <MdPets size={30} />
              <h3>Adoption</h3>
            </a>
          </Link>
          <Link href="/more">
            <a
              className={`flex flex-col justify-center items-center ${
                route === "/more" ? `text-[#FFC700] dark:text-[#CDA000]` : ""
              }`}
            >
              <MdMoreHoriz size={30} />
              More
            </a>
          </Link>
        </nav>
      </div>
      <div className="hidden md:block w-full">
        <div className="flex justify-between items-center p-6 font-medium text-lg lg:text-xl">
          <Link href="/">
            <a>
              <div className="hidden lg:block">
                <Image src={Logo} alt="Logo" width={230} height={50} />
              </div>
              <div className="block lg:hidden mr-12">
                <Image src={Logo} alt="Logo" width={200} height={45} />
              </div>
            </a>
          </Link>
          <nav className="flex">
            <Link href="/">
              <a
                className={`${
                  route === "/" ? `text-[#FFC700] dark:text-[#CDA000]` : ""
                }`}
              >
                <h3>Home</h3>
              </a>
            </Link>
            <Link href="/adoptions">
              <a
                className={`mx-12 lg:mx-24 ${
                  route === "/adoptions"
                    ? `text-[#FFC700] dark:text-[#CDA000]`
                    : ""
                }`}
              >
                <h3>Adoption</h3>
              </a>
            </Link>
            <Link href="/pets/mypets">
              <a
                className={`${
                  route === "/pets/mypets"
                    ? `text-[#FFC700] dark:text-[#CDA000]`
                    : ""
                }`}
              >
                <h3>My Pets</h3>
              </a>
            </Link>
          </nav>
          <div className="flex items-center">
            <button type="button" className="p-1 rounded-full lg:hidden">
              {theme === "light" ? (
                <MdModeNight size={20} onClick={() => handleTheme("dark")} />
              ) : (
                <MdLightMode size={20} onClick={() => handleTheme("light")} />
              )}
            </button>
            <div className="hidden lg:block">
              {theme === "light" ? (
                <div
                  onClick={() =>
                    handleTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="w-20 h-10 shadow-md rounded-3xl flex items-center"
                >
                  <MdLightMode className="ml-2" size={30} />
                </div>
              ) : (
                <div
                  onClick={() =>
                    handleTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="w-20 h-10 shadow-md bg-[#CDA000] rounded-3xl flex items-center relative overflow-hidden"
                >
                  <MdModeNight className="ml-11" size={30} />
                </div>
              )}
            </div>
            <nav className="flex">
              <Link href="/more">
                <a className="ml-6 items-center">
                  <MdMoreVert size={30} />
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
