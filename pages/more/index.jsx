import Image from "next/image";
import Link from "next/link";

import {
  MdPets,
  MdOutlineLogout,
  MdOutlineAccountCircle,
  MdEvent,
  MdChevronRight,
} from "react-icons/md";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";

export default function MoreMenu() {
  return (
    <Layout headTitle="Petdopter" headDesc="Welcome to petdopter!">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="More" />
        <div className="">
          <Link href="/profile">
            <a className="flex justify-between items-center my-4 font-bold">
              <div className="flex items-center">
                <MdOutlineAccountCircle size={70} />
                <h1 className="mx-4 text-xl">User</h1>
              </div>
              <MdChevronRight size={30} />
            </a>
          </Link>
          <div className="font-medium text-xl">
            <div>
              <Link href="/pets/mypets">
                <a>
                  <MdPets size={30} className="inline mr-2" /> My Pets
                </a>
              </Link>
            </div>
            <div className="my-3">
              <Link href="/meetings">
                <a>
                  <MdEvent size={30} className="inline mr-2" /> My Meeting
                  Appointment
                </a>
              </Link>
            </div>
            <div className="w-full">
              <MdOutlineLogout size={30} className="inline mr-2" /> Logout
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
