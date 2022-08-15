import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";

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
        alert(message);
        if (code === 200) {
          location.reload();
        }
      })
      .catch((error) => {
        alert(error, toString());
      })
      .finally(() => setLoading(false));
  };
  return (
    <Layout>
      <div className="pt-10 font-Poppins">
        <div className="grid grid-cols-1 justify-items-center">
          <div className="font-bold text-xl md:text-2xl lg:text-2xl pr-48 md:pr-80 lg:pr-96 md:space-x-40 lg:space-x-96">
            <h1>My Profile</h1>
            <p></p>
          </div>
          <div className="border-t-2 border-black dark:border-white w-72 pb-4 md:px-60 lg:px-96"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center">
            <div className="grid justify-items-center">
              <div className="avatar flex md:hidden lg:hidden">
                <div className="w-36 md:w-52 lg:w-72 rounded-full ring ring-primary">
                  <Image
                    className="rounded-full"
                    src={dataUser.photoprofile}
                    alt={dataUser.photoprofile}
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
                    alt={dataUser.photoprofile}
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="py-2"></div>
              <Link href="/profile/edit">
                <button
                  className="w-72 text-primary font-Poppins text-lg md:text-2xl py-1 md:py-2 mb-4 rounded-lg font-bold border-2 border-primary"
                  type="submit"
                >
                  Edit Profile
                </button>
              </Link>
              <button
                onClick={(e) => handleDelete(e)}
                type="submit"
                className="w-72 font-Poppins text-lg md:text-2xl py-1 md:py-2 mb-4 rounded-lg font-medium bg-red-500"
              >
                Delete Account
              </button>
              <div className="border-b-2 lg:hidden border-black dark:border-white w-72 pt-4 md:px-60"></div>
            </div>
            <div className="grid w-72 md:w-full border-l-8 border-primary pl-3 text-md md:text-2xl lg:text-2xl lg:items-center">
              <table className="">
                <thead className="">
                  <tr>
                    <td>Full name</td>
                    <td className="text-primary">{dataUser.fullname}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td className="text-primary">{dataUser.city}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td className="text-primary">{dataUser.address}</td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td className="text-primary">{dataUser.username}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td className="text-primary">{dataUser.email}</td>
                  </tr>
                  <tr>
                    <td>Phone number</td>
                    <td className="text-primary">{dataUser.phonenumber}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
