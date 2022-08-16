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
    // "https://golangprojectku.site/meetings",
    "https://virtserver.swaggerhub.com/Capstone-tim1/PetAdopter-tim1/1.0.0/meetings",
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
        destination: "/",
      },
    };
  }
}

export default function MeetingAppointment({ data, token }) {
  const [dataMeetings, setDataMeetings] = useState(data);

  if (!dataMeetings) {
    return (
      <Layout>
        <div className="w-screen pt-10 grid justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start">
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-sm md:text-lg rounded-3xl font-medium">
                <p className="dark:text-black bg-primary py-2 px-3 rounded-xl">
                  Click to show/hide Appointment
                </p>
              </div>
              <div className="collapse-content">
                <div>
                  <div className="font-bold text-lg">Appointment</div>
                  <hr className="border-black dark:border-white w-72 py-2" />
                </div>
                <div className="opacity-60">no appointment</div>
              </div>
            </div>
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-sm md:text-lg rounded-3xl font-medium">
                <p className="dark:text-black bg-primary py-2 px-3 rounded-xl">
                  Click to show/hide My Invitation
                </p>
              </div>
              <div className="collapse-content">
                <div>
                  <div className="font-bold text-lg pt-2">My Invitation</div>
                  <hr className="border-black dark:border-white w-72 py-2" />
                </div>
                <div className="opacity-60">noi ivitation</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="w-screen pt-10 grid justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start">
            <div className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-sm md:text-lg rounded-3xl font-medium">
                <p className="dark:text-black bg-primary py-2 px-3 rounded-xl">
                  Click to show/hide My Appointment
                </p>
              </div>
              <div className="collapse-content">
                <div>
                  <div className="font-bold text-lg">My Appointment</div>
                  <hr className="border-black dark:border-white w-72 py-2" />
                </div>
                <div className="grid grid-cols-1 gap-5">
                  {dataMeetings.map((data) => (
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
              <div className="collapse-title text-sm md:text-lg rounded-3xl font-medium">
                <p className="dark:text-black bg-primary py-2 px-3 rounded-xl">
                  Click to show/hide My Invitation
                </p>
              </div>
              <div className="collapse-content">
                <div>
                  <div className="font-bold text-lg pt-2">My Invitation</div>
                  <hr className="border-black dark:border-white w-72 py-2" />
                </div>
                <div className="grid flex-cols-1 gap-5">
                  {dataMeetings.map((data) => (
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
        </div>
      </Layout>
    );
  }
}
