import { useState } from "react";
import Image from "next/image";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";

export async function getServerSideProps({ req, res, params }) {
  const { id } = params;

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
    `https://golangprojectku.site/users/${id}`,
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

export default function ApplierDetail({ data }) {
  const [user, setUser] = useState(data);

  return (
    <Layout headTitle="Applier Profile" headDesc="Welcome to petdopter!">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="Applier Profile" />
        <div className="w-full p-8 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/4 flex justify-center">
            <div className="flex justify-center my-4 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 rounded-full border border-[#70BAC6] dark:border-[#568C95]">
              <Image
                src={user.photoprofile}
                alt={user.name}
                width={1000}
                height={1000}
                fill="responsive"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="w-full md:w-3/4 flex justify-between my-8 md:my-0 md:mx-24 lg:mx-52">
            <div className="font-bold md:text-lg lg:text-xl">
              <h4>Fullname</h4>
              <h4>Username</h4>
              <h4>City</h4>
            </div>
            <div className="text-[#FFC700] dark:text-[#CDA000] md:text-lg lg:text-xl">
              <p>{user.fullname}</p>
              <p>@{user.username}</p>
              <p>{user.city}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
