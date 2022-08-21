import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  return {
    props: {
      token,
    },
  };
}

function MyAppointmentCard({
  token,
  meetingid,
  adoptionid,
  date,
  time,
  place,
  petname,
  seekername,
}) {
  console.log(token);
  const [loading, setLoading] = useState(false);
  const handleDone = async (e) => {
    setLoading(true);
    e.preventDefault();

    const raw = JSON.stringify({ status: "Adopted" });

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: raw,
    };

    fetch(`https://golangprojectku.site/appliers/${adoptionid}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
      })
      .catch((error) => {
        alert(error, toString());
      })
      .finally(() => setLoading(false));
  };

  const handleCancel = async (e) => {
    setLoading(true);
    e.preventDefault();

    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://golangprojectku.site/meetings/${meetingid}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
      })
      .catch((error) => {
        alert(error, toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="grid grid-cols-1 gap-5 ">
      <div className="w-72 text-sm md:text-lg border-l-8 border-primary pl-3">
        <table>
          <thead>
            <tr>
              <td className="font-medium">Date</td>
              <td className="text-primary">{date}</td>
            </tr>
            <tr>
              <td className="font-medium">Time</td>
              <td className="text-primary">{time}</td>
            </tr>
            <tr>
              <td className="font-medium">Place</td>
              <td className="text-primary">{place}</td>
            </tr>
            <tr>
              <td className="font-medium">Pet name</td>
              <td className="text-primary">{petname}</td>
            </tr>
            <tr>
              <td className="font-medium">Seeker name</td>
              <td className="text-primary">{seekername}</td>
            </tr>
          </thead>
        </table>
        <div className="space-x-1 dark:text-black">
          <Link href={`/meetings/edit/${meetingid}`}>
            <button className="w-16 md:w-20 text-md md:text-lg rounded-lg font-Poppins bg-primary">
              Edit
            </button>
          </Link>
          <button
            onClick={(e) => handleDone(e)}
            className="w-16 md:w-20 text-md md:text-lg rounded-lg font-Poppins bg-primary"
          >
            Done
          </button>
          <button
            onClick={(e) => handleCancel(e)}
            className="w-16 md:w-20 text-md md:text-lg rounded-lg font-Poppins bg-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function MyInvitationCard({ date, time, place, petname, ownername }) {
  return (
    <div className="grid grid-cols-1 gap-5 ">
      <div className="w-72 text-sm md:text-lg border-l-8 border-primary pl-3">
        <table>
          <thead>
            <tr>
              <td className="font-medium">Date</td>
              <td className="text-primary">{date}</td>
            </tr>
            <tr>
              <td className="font-medium">Time</td>
              <td className="text-primary">{time}</td>
            </tr>
            <tr>
              <td className="font-medium">Place</td>
              <td className="text-primary">{place}</td>
            </tr>
            <tr>
              <td className="font-medium">Pet name</td>
              <td className="text-primary">{petname}</td>
            </tr>
            <tr>
              <td className="font-medium">Owner name</td>
              <td className="text-primary">{ownername}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export { MyAppointmentCard, MyInvitationCard };
