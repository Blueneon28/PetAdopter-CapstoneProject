import { getCookie, deleteCookie } from "cookies-next";
import { useState } from "react";

import Layout from "../../components/Layout";
import {
  MyAppointmentCard,
  MyInvitationCard,
} from "../../components/MeetingCard";

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
    deleteCookie("token");
    return {
      props: {
        data: {
          invitation: "no invitation",
          appointment: "no appointment",
        },
      },
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}

export default function MeetingAppointment({ data }) {
  const [datas, setDatas] = useState(data);
  // const [datas, setData] = useState([
  //   {
  //     meetingid: 1,
  //     time: "09:00:00",
  //     date: "21-12-00",
  //     petname: "Tom",
  //     petphoto: "Tom.jpg",
  //     seekername: "Jacob",
  //     ownername: "John",
  //     ownerphoto: "john.jpg",
  //     owneraddress: "Jakarta",
  //   },
  //   {
  //     meetingid: 2,
  //     time: "09:00:00",
  //     date: "21-12-00",
  //     petname: "Bob",
  //     petphoto: "Bob.jpg",
  //     seekername: "Jacob",
  //     ownername: "John",
  //     ownerphoto: "john.jpg",
  //     owneraddress: "Jakarta",
  //   },
  // ]);
  if (datas.invitation === "no invitation") {
    return (
      <Layout>
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 justify-items-center lg:items-start">
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-sm md:text-lg font-medium">
              Click to show/hide My Appointment
            </div>
            <div className="collapse-content">
              <div>
                <div className="font-bold text-2xl">My Appointment</div>
                <hr className="border-black dark:border-white w-72 py-2" />
                <div className="opacity-50">{datas.appointment}</div>
              </div>
            </div>
          </div>
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-sm md:text-lg font-medium">
              Click to show/hide My Invitation
            </div>
            <div className="collapse-content">
              <div>
                <div className="font-bold text-2xl">My Invitation</div>
                <hr className="border-black dark:border-white w-72 py-2" />
                <div className="opacity-50">{datas.invitation}</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 justify-items-center lg:items-start">
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-sm md:text-lg font-medium">
              Click to show/hide My Appointment
            </div>
            <div className="collapse-content">
              <div>
                <div className="font-bold text-2xl">My Appointment</div>
                <hr className="border-black dark:border-white w-72 py-2" />
              </div>
              <div className="grid grid-cols-1 gap-5">
                {datas.map((data) => (
                  <MyAppointmentCard
                    key={data.meetingid}
                    id={data.meetingid}
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
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-sm md:text-lg font-medium">
              Click to show/hide My Invitation
            </div>
            <div className="collapse-content">
              <div>
                <div className="font-bold text-2xl">My Invitation</div>
                <hr className="border-black dark:border-white w-72 py-2" />
              </div>
              <div className="grid flex-cols-1 gap-5">
                {datas.map((data) => (
                  <MyInvitationCard
                    key={data.meetingid}
                    id={data.meetingid}
                    date={data.date}
                    time={data.time}
                    place={data.owneraddress}
                    petname={data.petname}
                    ownername={data.ownername}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
