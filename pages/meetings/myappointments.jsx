import { getCookie, deleteCookie } from "cookies-next";
import { useState } from "react";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import { MyAppointmentCard } from "../../components/MeetingCard";

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
    "https://golangprojectku.site/meetings",
    requestOptions
  );
  const data = await response.json();
  if (response.status === 200) {
    return {
      props: { code: data.code, data: data.data, message: data.message, token },
    };
  } else {
    if (response.status === 404) {
      return {
        props: { data: "" },
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
}

export default function MyAppointments({ data, token }) {
  const [dataMeetings] = useState(data);
  if (!data) {
    return (
      <Layout
        headTitle="My Appointments"
        headDesc="All My Meetings Appointment List"
      >
        <div className="p-4 md:px-12 lg:px-24">
          <TitlePage page="My Appointments" />
          <div className="py-4 md:py-6 font-Poppins grid justify-center">
            no appointments yet
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout
        headTitle="My Appointments"
        headDesc="All My Meetings Appointment List"
      >
        <div className="p-4 md:px-12 lg:px-24">
          <TitlePage page="My Appointments" />
          <div className="py-4 md:py-6 font-Poppins grid justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {dataMeetings.map((data) => (
                <MyAppointmentCard
                  key={data.meetingid}
                  meetingid={data.meetingid}
                  adoptionid={data.adoptionid}
                  date={data.date}
                  time={data.time}
                  place={data.owneraddress}
                  petname={data.petname}
                  seekername={data.seekername}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
