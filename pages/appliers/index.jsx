import { useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import ApplierCard from "../../components/ApplierCard";

// export async function getServerSideProps({ req, res }) {
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
//     "https://virtserver.swaggerhub.com/Capstone-tim1/PetAdopter-tim1/1.0.0/mypets",
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

export default function MyPets({ data, token }) {
  const [pets, setPets] = useState(data);
  const [loading, setLoading] = useState(false);

  return (
    <Layout headTitle="Applier List" headDesc="Welcome to petdopter!">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="Applier List" />
        <div className="my-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          {/* {pets.map((pet) => ( */}
          <ApplierCard
            // key={id}
            id={1}
            name={"Roby"}
            image={"img.jpg"}
            ownername={"Anon"}
            petname={"Puss"}
          />
          {/* ))} */}
        </div>
      </div>
    </Layout>
  );
}