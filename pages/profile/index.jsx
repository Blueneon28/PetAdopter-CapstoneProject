import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";
import { NoBackgroundButton } from "../../components/CustomButton";

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

export default function Profile({ data }) {
  return (
    <>
      <Layout>
        <div className="w-screen h-screen pt-10 grid items-start font-Poppins">
          <div className="grid grid-cols-1 gap-5 justify-items-center">
            <div className="font-bold text-2xl">
              <h1>My Profile</h1>
              <hr className="border-black dark:border-white w-72" />
            </div>
            <div className="grid grid-cols-1 gap-5 justify-items-center">
              <Image src="" />
              <Link href="/profile/edit">
                <NoBackgroundButton label="Edit Profile" />
              </Link>
              <hr className="border-black dark:border-white w-72" />
              <hr />
              <div className="w-72 text-sm border-l-8 border-primary pl-3">
                <table>
                  <thead>
                    <tr>
                      <td>Full name</td>
                      <td className="text-primary">{data.fullname}</td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td className="text-primary">{data.city}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td className="text-primary">{data.address}</td>
                    </tr>
                    <tr>
                      <td>Username</td>
                      <td className="text-primary">{data.username}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td className="text-primary">{data.email}</td>
                    </tr>
                    <tr>
                      <td>Phone number</td>
                      <td className="text-primary">{data.phonenumber}</td>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
