/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { getCookie, deleteCookie } from "cookies-next";
import jwt_decode from "jwt-decode";

import { MdModeEdit, MdDelete } from "react-icons/md";
import Layout from "../../components/Layout";

export async function getServerSideProps({ req, res, params }) {
  const { id } = params;

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
    `https://golangprojectku.site/pets/${id}`,
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
        id,
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

export default function PetDetail({ data, token, jwtDecode, id }) {
  const { ID } = jwtDecode;
  const router = useRouter();
  const { query } = router;

  const [pet, setPet] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleAdopt = async (e) => {
    setLoading(true);
    e.preventDefault();

    const body = {
      petid: parseInt(id),
    };

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("https://golangprojectku.site/appliers", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, message } = result;
        if (code === 200) {
          router.push("/adoptions");
        }
        alert(message);
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://golangprojectku.site/pets/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, message } = result;
        if (code === 200) {
          router.push(`/pets/mypets`);
        }
        alert(message);
      })
      .catch((error) => alert(error.toString()));
  };

  return (
    <Layout headTitle="Pet Detail" headDesc="Welcome to petdopter!">
      <div className="w-full h-full flex flex-col md:flex-row md:p-4">
        <div className="w-full md:hidden">
          <Image
            src={pet.petphoto}
            alt={pet.petname}
            width={1080}
            height={1080}
            layout={"responsive"}
          />
        </div>
        <div className="w-1/4 hidden md:block mr-8">
          <Image
            src={pet.petphoto}
            alt={pet.petname}
            width={1200}
            height={1600}
            layout={"responsive"}
            className="rounded-md"
          />
        </div>
        <div className="w-full h-full -mt-20 md:mt-0 z-10 bg-white dark:bg-black rounded-t-3xl md:rounded-t-none">
          <div className="h-full p-4 md:p-0 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center my-2">
                <div className="inline-flex">
                  <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                    {pet.petname}
                  </h1>
                  {ID === pet.ownerid ? (
                    <>
                      <Link href={`/pets/editPet/${parseInt(query.id)}`}>
                        <button className="mx-2">
                          <MdModeEdit size={25} />
                        </button>
                      </Link>
                      <button className="mx-1" onClick={() => handleDelete()}>
                        <MdDelete size={25} />
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
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

            <div className="text-center mb-20 md:my-12">
              {ID !== pet.ownerid ? (
                <button
                  className="w-3/4 md:w-1/2 bg-[#FFC700] dark:bg-[#CDA000] text-white p-1 rounded-full font-bold text-lg md:text-xl"
                  onClick={(e) => handleAdopt(e)}
                >
                  Apply Adopt
                </button>
              ) : (
                <Link href="/appliers">
                  <button className="w-3/4 md:w-1/2 bg-[#FFC700] dark:bg-[#CDA000] text-white p-1 rounded-full font-bold text-lg md:text-xl">
                    View Applier
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
