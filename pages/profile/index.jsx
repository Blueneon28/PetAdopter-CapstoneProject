import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

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

export default function Profile({ data, token }) {
  const [dataUser, setDataUser] = useState(data);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (e) => {
    setLoading(true);
    e.preventDefault();

    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://golangprojectku.site/users`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message, code } = result;
        if (code === 200) {
          deleteCookie("token");
          router.push("/auth/login");
        }
        alert(message);
      })
      .catch((error) => {
        alert(error, toString());
      })
      .finally(() => setLoading(false));
  };
  return (
    <Layout headTitle={`${data.fullname}`} headDesc="Detail Profile">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="My Profile" />
        <div className="py-4 md:py-6 font-Poppins">
          <div className="grid grid-cols-1 justify-items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center">
              <div className="grid justify-items-center">
                <div className="avatar flex md:hidden lg:hidden">
                  <div className="w-36 md:w-52 lg:w-72 rounded-full ring ring-primary">
                    <Image
                      className="rounded-full"
                      src={dataUser.photoprofile}
                      alt={dataUser.username}
                      width={150}
                      height={150}
                    />
                  </div>
                </div>
                <div className="avatar hidden md:flex lg:flex">
                  <div className="w-36 md:w-52 lg:w-72 rounded-full ring ring-primary">
                    <Image
                      className="rounded-full"
                      src={dataUser.photoprofile}
                      alt={dataUser.username}
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
                <div className="py-2"></div>
                <Link href="/profile/edit">
                  <button
                    className="w-72 text-primary font-Poppins text-md md:text-xl py-1 md:py-2 mb-4 rounded-lg font-bold border-2 border-primary"
                    type="submit"
                  >
                    Edit Profile
                  </button>
                </Link>
                <button
                  onClick={(e) => handleDelete(e)}
                  disabled={loading}
                  type="submit"
                  className="w-72 text-black font-Poppins text-md md:text-xl py-1 md:py-2 mb-4 rounded-lg font-medium bg-red-500"
                >
                  Delete Account
                </button>
                <div className="border-b-2 lg:hidden border-black dark:border-white w-72 pt-0 md:px-60"></div>
              </div>
              <div className="grid justify-items-center text-md md:text-xl lg:border-l-8 lg:border-primary lg:pl-10">
                <p className="font-semibold">Full name</p>
                <p>{dataUser.fullname}</p>
                <p className="font-semibold mt-2">City</p>
                <p>{dataUser.city}</p>
                <p className="font-semibold mt-2">Address</p>
                <p>{dataUser.address}</p>
                <p className="font-semibold mt-2">Username</p>
                <p>{dataUser.username}</p>
                <p className="font-semibold mt-2">Email</p>
                <p>{dataUser.email}</p>
                <p className="font-semibold mt-2">Phone number</p>
                <p>{dataUser.phonenumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
