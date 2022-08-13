import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";
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
    "https://golangprojectku.site/meetings",
    requestOptions
  );
  const data = await response.json();
  if (response.status === 200) {
    return {
      props: { code: data.code, data: data.data, message: data.message, token },
    };
  } else {
    // deleteCookie("token");
    return {
      props: {
        data: {
          invitation: "no invitation",
          appointment: "no appointment",
        },
      },
      // redirect: {
      //   permanent: false,
      //   destination: "/",
      // },
    };
  }
}

export default function MeetingAppointment({ data }) {
  if (!data.invitation === "no invitation") {
    return (
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium">
              Click to show/hide My Appointment
            </div>
            <div className="collapse-content">
              <div>
                <div className="font-bold text-2xl">My Appointment</div>
                <hr className="border-black dark:border-white w-72 py-2" />
                <div className="opacity-50">{data.appointment}</div>
              </div>
            </div>
          </div>
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium">
              Click to show/hide My Invitation
            </div>
            <div className="collapse-content">
              <div>
                <div className="font-bold text-2xl">My Invitation</div>
                <hr className="border-black dark:border-white w-72 py-2" />
                <div className="opacity-50">{data.invitation}</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium">
              Click to show/hide My Appointment
            </div>
            <div className="collapse-content">
              <div>
                <div className="font-bold text-2xl">My Appointment</div>
                <hr className="border-black dark:border-white w-72 py-2" />
              </div>
              <div className="grid grid-cols-1 gap-5 ">
                {/* <Image src={`/${ownerphoto}`} width={100} height={100} /> */}
                <div className="w-72 text-sm border-l-8 border-primary pl-3">
                  <table>
                    <thead>
                      <tr>
                        <td>Date</td>
                        <td className="text-primary">{data.date}</td>
                      </tr>
                      <tr>
                        <td>Time</td>
                        <td className="text-primary">{data.time}</td>
                      </tr>
                      <tr>
                        <td>Place</td>
                        <td className="text-primary">{data.owneraddress}</td>
                      </tr>
                      <tr>
                        <td>Pet name</td>
                        <td className="text-primary">{data.petname}</td>
                      </tr>
                      <tr>
                        <td>Owner name</td>
                        <td className="text-primary">{data.ownername}</td>
                      </tr>
                    </thead>
                  </table>
                  <div className="space-x-2">
                    <SmallButton
                      label="Edit"
                      href="/meetings/edit"
                      className="bg-primary text-white font-bold"
                    />
                    <SmallButton
                      label="Delete"
                      href="#"
                      className="bg-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium">
              Click to show/hide My Invitation
            </div>
            <div className="collapse-content">
              <div>
                <div className="font-bold text-2xl">My Invitation</div>
                <hr className="border-black dark:border-white w-72 py-2" />
              </div>
              <div className="grid grid-cols-1 gap-5 ">
                {/* <Image src={`/${ownerphoto}`} width={100} height={100} /> */}
                <div className="w-72 text-sm border-l-8 border-primary pl-3">
                  <table>
                    <thead>
                      <tr>
                        <td>Date</td>
                        <td className="text-primary">{data.date}</td>
                      </tr>
                      <tr>
                        <td>Time</td>
                        <td className="text-primary">{data.time}</td>
                      </tr>
                      <tr>
                        <td>Place</td>
                        <td className="text-primary">{data.owneraddress}</td>
                      </tr>
                      <tr>
                        <td>Pet name</td>
                        <td className="text-primary">{data.petname}</td>
                      </tr>
                      <tr>
                        <td>Owner name</td>
                        <td className="text-primary">{data.ownername}</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
