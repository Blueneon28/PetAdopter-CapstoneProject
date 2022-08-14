import { useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import AdoptionCard from "../../components/AdoptionCard";

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
    "https://virtserver.swaggerhub.com/Capstone-tim1/PetAdopter-tim1/1.0.0/myadoption",
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

export default function MyAdoptions({ data, token }) {
  const [adoptions, setAdoptions] = useState(data);
  const [loading, setLoading] = useState(false);

  return (
    <Layout headTitle="Adoption History" headDesc="Welcome to adoptiondopter!">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="Adoption History" />
        <div className="my-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          {adoptions.map((adoption) => (
            <AdoptionCard
              key={adoption.adoptionid}
              petid={adoption.petid}
              petname={adoption.petname}
              petimage={adoption.petphoto}
              ownername={adoption.ownername}
              city={adoption.owneraddress}
              status={adoption.status}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
