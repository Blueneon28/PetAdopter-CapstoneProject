/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Image from "next/image";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";

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
    `https://virtserver.swaggerhub.com/Capstone-tim1/PetAdopter-tim1/1.0.0/pets/${id}`,
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

export default function PetDetail({ data, token }) {
  const [pet, setPet] = useState(data);

  return (
    <Layout headTitle="Pet Detail" headDesc="Welcome to petdopter!">
      <div className="w-full h-full flex flex-col md:flex-row md:p-4">
        <div className="w-full h-1/4 md:h-auto md:w-2/5 md:py-2 px-6">
          {/* <Image src={pet.petphoto} alt={name} width={50} height={80} /> */}
          <img src={pet.petphoto} alt={pet.petname} />
        </div>
        <div className="w-full h-full rounded-t-3xl md:rounded-t-none">
          <div className="h-full p-4 md:p-0 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center my-2">
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                  {pet.petname}
                </h1>
                <h5 className="italic text-xs md:text-sm text-[#D9D9D9]">
                  {pet.species}
                </h5>
              </div>
              <div className="md:flex md:justify-between">
                <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">
                  {pet.ownername}
                </h2>
                <p className="md:text-lg">{pet.city}</p>
              </div>
              <div className="my-4">
                <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">
                  Detail
                </h3>
                <div className="flex justify-between">
                  <div>
                    <h4 className="md:text-lg lg:text-xl">Gender</h4>
                    <p className="font-medium text-[#FFC700] dark:text-[#CDA000] md:text-lg lg:text-xl">
                      {pet.gender === 1 ? "Male" : "Female"}
                    </p>
                  </div>
                  <div>
                    <h4 className="md:text-lg lg:text-xl">Age</h4>
                    <p className="font-medium text-[#FFC700] dark:text-[#CDA000] md:text-lg lg:text-xl">
                      {pet.age} months
                    </p>
                  </div>
                  <div className="md:text-lg lg:text-xl">
                    <h4>Color</h4>
                    <p className="font-medium text-[#FFC700] dark:text-[#CDA000] md:text-lg lg:text-xl">
                      {pet.color}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">
                  Description
                </h3>
                <p className="h-52">{pet.description}</p>
              </div>
            </div>

            <div className="text-center md:my-12">
              <button className="w-3/4 md:w-1/2 bg-[#FFC700] dark:bg-[#CDA000] text-white p-1 rounded-full font-bold text-lg md:text-xl">
                Apply Adopt
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
