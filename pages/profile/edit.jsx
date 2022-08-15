import { useState } from "react";
import Image from "next/image";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import { SmallButton } from "../../components/CustomButton";
import { CustomInput, CustomInputComboBox } from "../../components/CustomInput";

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

export default function EditProfile({ data, token }) {
  const [dataUser, setDataUser] = useState(data);
  const [objSubmit, setObjSubmit] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch("https://golangprojectku.site/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, message } = result;
        if (code === 200) {
          router.push("/profile");
        }
        alert(message);
        setObjSubmit({});
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };
  return (
    <Layout>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="pt-10">
          <div className="grid grid-cols-1 justify-items-center">
            <div className="font-bold text-xl md:text-2xl lg:text-2xl pr-44 md:pr-80 lg:pr-96 md:space-x-40 lg:space-x-96">
              <h1>Edit Profile</h1>
              <p></p>
            </div>
            <div className="border-t-2 border-black dark:border-white w-72 pb-4 md:px-60 lg:px-96"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center">
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
                <input
                  className="mt-4 input input-bordered input-primary input-sm md:input-md lg:input-md w-48 md:w-80 lg:w-80 p-1 rounded-lg font-light text-xs md:text-xl lg:text-xl border-2 border-accent font-Poppins dark:bg-black"
                  id="inputFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setDataUser({
                      ...dataUser,
                      photoprofile: URL.createObjectURL(e.target.files[0]),
                    });
                    handleChange(e.target.files[0], "photoprofile");
                  }}
                />
              </div>
              <div className="mt-4 grid grid-cols-1 justify-items-center gap-y-2 md:gap-4">
                <CustomInput
                  id="inputFullName"
                  type="text"
                  placeholder="Full name"
                  value={dataUser.fullname}
                  onChange={(e) => handleChange(e.target.value, "fullname")}
                />
                <CustomInputComboBox
                  id="inputCity"
                  title="City"
                  op1="Jakarta"
                  op2="Malang"
                  op3="Semarang"
                  value={dataUser.city}
                  onChange={(e) => handleChange(e.target.value, "city")}
                />
                <CustomInput
                  id="inputFullAddress"
                  type="text"
                  placeholder="Full address"
                  value={dataUser.address}
                  onChange={(e) => handleChange(e.target.value, "address")}
                />
                <CustomInput
                  id="inputUsername"
                  type="text"
                  placeholder="Username"
                  value={dataUser.username}
                  onChange={(e) => handleChange(e.target.value, "username")}
                />
                <CustomInput
                  id="inputEmail"
                  type="email"
                  placeholder="Email"
                  value={dataUser.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                />
                <CustomInput
                  id="inputPhoneNumber"
                  type="number"
                  placeholder="Phone number"
                  value={dataUser.phonenumber}
                  onChange={(e) => handleChange(e.target.value, "phonenumber")}
                />
                <CustomInput
                  id="inputPassword"
                  type="password"
                  placeholder="Password"
                  value={dataUser.password}
                  onChange={(e) => handleChange(e.target.value, "password")}
                />
              </div>
              <div className="pt-20 space-x-2 flex flex-cols-2 justify-center">
                <SmallButton
                  onClick={(e) => handleSubmit(e)}
                  label="Done"
                  loading={loading}
                  className="bg-primary text-white font-bold"
                />
                <SmallButton
                  href="/profile"
                  label="cancel"
                  className="bg-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
