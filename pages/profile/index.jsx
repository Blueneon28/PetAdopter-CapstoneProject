import Image from "next/image";
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

export default function Profile({ data }) {
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
      <div className="pt-10 grid items-start font-Poppins">
        <div className="grid grid-cols-1 gap-5 justify-items-center">
          <div className="font-bold text-2xl md:text-2xl px-20 md:px-44 border-b-2 border-black">
            <h1>My Profile</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center">
            <div className="grid justify-items-center">
              {/* <Image src={`/${photoprofile}`} width={100} height={100} /> */}
              <img src="//" height={150} width={150} />
              <Link href="/profile/edit">
                <button
                  className="w-72 text-primary font-Poppins text-lg md:text-xl py-1 mb-4 rounded-lg font-bold border-2 border-primary"
                  type="submit"
                >
                  Edit Profile
                </button>
              </Link>
              <button className="w-72 font-Poppins text-lg md:text-xl py-1 mb-4 rounded-lg font-medium bg-red-500">
                Delete Account
              </button>
              <div className="border-b-2 lg:hidden border-black w-full pt-4 md:px-60"></div>
            </div>
            <div className="w-72 md:w-full border-l-8 border-primary pl-3">
              <table className="table-compact">
                <thead className="text-xl md:text-2xl lg:text-4xl">
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
  );
}
