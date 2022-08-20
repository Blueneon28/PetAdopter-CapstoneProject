import { useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import jwt_decode from "jwt-decode";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import ApplierCard from "../../components/ApplierCard";

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  const jwtDecode = jwt_decode(token);

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
    "https://golangprojectku.site/appliers",
    requestOptions
  );
  const data = await response.json();
  if (response.status === 200) {
    return {
      props: {
        code: data.code,
        data: data.data,
        message: data.message,
        token,
        jwtDecode,
      },
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

export default function MyPets({ data, token, jwtDecode }) {
  const { ID } = jwtDecode;

  const [appliers, setAppliers] = useState(data);
  const [loading, setLoading] = useState(false);

  return (
    <Layout headTitle="Applier List" headDesc="Welcome to petdopter!">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="Applier List" />
        <div className="my-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          {appliers.map((applier) =>
            applier.ownerid === ID && applier.status !== "Rejected" ? (
              <ApplierCard
                key={applier.id}
                id={applier.id}
                adoptionid={applier.adoptionid}
                name={applier.seekername}
                image={applier.seekerphoto}
                ownername={applier.ownername}
                petname={applier.petname}
                status={applier.status}
                token={token}
              />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </Layout>
  );
}
