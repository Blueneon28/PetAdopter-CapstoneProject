import { useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import { CustomInput } from "../../components/CustomInput";
import { SmallButton } from "../../components/CustomButton";

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
    // "https://golangprojectku.site/meetings",
    " https://virtserver.swaggerhub.com/Capstone-tim1/PetAdopter-tim1/1.0.0/meetings",

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

export default function EditMeeting({ data, token }) {
  const [dataMeeting, setDataMeeting] = useState(data);
  const [loading, setLoading] = useState(false);
  const [objSubmit, setObjSubmit] = useState({});

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const raw = new JSON.stringify();
    for (const key in objSubmit) {
      raw.append(key, objSubmit[key]);
    }
    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: raw,
    };

    fetch("https://golangprojectku.site/meetings", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
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
    <Layout headTitle="Meeting Invitation" headDesc="Edit Meeting Invitation">
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
                    value={dataMeeting.date}
                    onChange={(e) => handleChange(e.target.value, "date")}
                  />
                  <CustomInput
                    id="inputTime"
                    type="time"
                    placeholder="Time"
                    value={dataMeeting.time}
                    onChange={(e) => handleChange(e.target.value, "time")}
                  />
                </div>
                <div className="pt-20 space-x-2 flex flex-cols-2 justify-center">
                  <SmallButton
                    label="Update"
                    loading={loading}
                    className="text-white bg-primary font-semibold"
                  />
                  <SmallButton
                    href="/meetings"
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
