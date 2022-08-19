import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../../components/Layout";
import TitlePage from "../../../components/TitlePage";
import { CustomInput } from "../../../components/CustomInput";
import { SmallButton } from "../../../components/CustomButton";

export async function getServerSideProps({ req, res, params }) {
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  const { id } = params;
  return {
    props: {
      adoptionid: id,
    },
  };

  // const requestOptions = {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  // const response = await fetch(
  //   // `https://golangprojectku.site/adoptions/${id}`,
  //   `https://virtserver.swaggerhub.com/Capstone-tim1/PetAdopter-tim1/1.0.0/adoptions/${id}`,
  //   requestOptions
  // );
  // const data = await response.json();
  // if (response.status === 200) {
  //   return {
  //     props: { code: data.code, data: data.data, message: data.message, token },
  //   };
  // } else {
  //   deleteCookie("token");
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/auth/login",
  //     },
  //   };
  // }
}

export default function AddMeeting({ token, adoptionid }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (date && time) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [date, time]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      token,
      adoptionid,
      date,
      time,
    };
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
    fetch("https://golangprojectku.site/meetings", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        if (result.code === 200) {
          router.push("/myappointments");
        }
        alert(message);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  };
  return (
    <Layout headTitle="Meeting Invitation" headDesc="Add Meeting Invitation">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="Meeting Invitation" />
        <div className="py-4 md:py-6 font-Poppins">
          <div className="grid grid-cols-1 gap-5 justify-items-center">
            <div className="grid grid-cols-1 gap-5 md:w-96">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="grid grid-cols-1 justify-items-center gap-2">
                  <CustomInput
                    id="inputDate"
                    type="date"
                    placeholder="Date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <CustomInput
                    id="inputTime"
                    type="time"
                    placeholder="Time"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="pt-20 space-x-2 flex flex-cols-2 justify-center">
                  <SmallButton
                    onClick={(e) => handleSubmit(e)}
                    label="Add"
                    loading={loading || disabled}
                    type="submit"
                    className="bg-primary text-white font-semibold"
                  />
                  <SmallButton
                    href="/appliers"
                    label="cancel"
                    className="text-black bg-accent"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
