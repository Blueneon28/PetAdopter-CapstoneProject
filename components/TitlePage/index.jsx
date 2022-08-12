import Image from "next/image";
import Link from "next/link";

import { MdDehaze } from "react-icons/md";
import Logo from "../../assets/img/logo-petdopter.png";

export default function TitlePage({ page = "Title" }) {
  return (
    <div className="w-full flex justify-between items-center border-b-2 lg:border-b-4 border-black dark:border-white md:py-2">
      <div className="flex items-center">
        <div className="md:hidden mr-2">
          <Image src={Logo} alt="Logo" width={25} height={35} />
        </div>
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">{page}</h1>
      </div>
      <div className={`${page === "Discover" ? "block" : "hidden"}`}>
        <Link href="/meeting">
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
    </div>
  );
}
