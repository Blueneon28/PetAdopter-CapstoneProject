import { useState } from "react";
import Image from "next/image";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";

// export async function getServerSideProps({ req, res, params }) {
//   const { id } = params;

//   const token = getCookie("token", { req, res });
//   if (!token) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/auth/login",
//       },
//     };
//   }
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await fetch(
//     `https://virtserver.swaggerhub.com/Capstone-tim1/PetAdopter-tim1/1.0.0/pets/${id}`,
//     requestOptions
//   );
//   const data = await response.json();
//   if (response.status === 200) {
//     return {
//       props: { code: data.code, data: data.data, message: data.message, token },
//     };
//   } else {
//     deleteCookie("token");
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/auth/login",
//       },
//     };
//   }
// }

export default function ApplierDetail({ data, token }) {
  const [applier, setApplier] = useState(data);

  return (
    <Layout headTitle="Applier Profile" headDesc="Welcome to petdopter!">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="Applier Profile" />
        <div className="w-full p-8 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/4 flex justify-center">
            <div className="flex justify-center my-4 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 rounded-full border border-[#70BAC6] dark:border-[#568C95]">
              {/* <Image src={image} alt={name} width={50} height={80} /> */}
              <img src={"image.jpg"} alt={"image"} />
            </div>
          </div>
          <div className="w-full md:w-3/4 flex justify-between my-8 md:my-0 md:mx-24 lg:mx-52">
            <div className="font-bold md:text-lg lg:text-xl">
              <h4>Fullname</h4>
              <h4>Username</h4>
              <h4>City</h4>
            </div>
            <div className="text-[#FFC700] dark:text-[#CDA000] md:text-lg lg:text-xl">
              <p>name</p>
              <p>@username</p>
              <p>city</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between md:justify-center my-12">
          <button className="w-full md:w-1/3 rounded-full bg-[#FFC700] dark:bg-[#CDA000] text-white font-medium text-xs md:text-base lg:text-lg p-1">
            Accept
          </button>
          <button className="w-full md:w-1/3 my-2 md:my-0 md:ml-4 rounded-full bg-[#D98481] dark:bg-[#AF6C6A] text-white font-medium text-xs md:text-base lg:text-lg p-1">
            Reject
          </button>
        </div>
      </div>
    </Layout>
  );
}
