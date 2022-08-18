import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";

import {
  MdPets,
  MdOutlineLogout,
  MdOutlineAccountCircle,
  MdEvent,
  MdChevronRight,
} from "react-icons/md";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    "https://golangprojectku.site/users",
    requestOptions
  );
  const data = await response.json();
  if (response.status === 200) {
    return {
      props: { code: data.code, data: data.data, message: data.message, token },
    };
  } else {
    deleteCookie("token");
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
}

export default function MoreMenu({ data }) {
  const router = useRouter();

  const [user, setUser] = useState(data);

  const handleLogout = (e) => {
    e.preventDefault;
    deleteCookie("token");
    router.push("/auth/login");
  };
  return (
    <Layout headTitle="Petdopter" headDesc="Welcome to petdopter!">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="More" />
        <div className="">
          <Link href="/profile">
            <a className="flex justify-between items-center my-4 font-bold">
              <div className="flex items-center">
                <Image
                  src={user.photoprofile}
                  alt={user.fullname}
                  width={300}
                  height={300}
                  layout={"responsive"}
                  className="rounded-full"
                />
                <MdOutlineAccountCircle size={70} />
                <h1 className="mx-4 text-xl">{user.fullname}</h1>
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
            <button
              type="button"
              className="w-full text-left"
              onClick={(e) => handleLogout(e)}
            >
              <MdOutlineLogout size={30} className="inline mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
