import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

function MyAppointmentCard({
  token,
  status,
  meetingid,
  adoptionid,
  date,
  time,
  place,
  petname,
  seekername,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleDone = async (e) => {
    setLoading(true);
    e.preventDefault();

    const body = { status: "Adopted" };

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(`https://golangprojectku.site/appliers/${adoptionid}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message, code } = result;
        if (code === 200) {
          router.reload();
        }
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
        const { message, code } = result;
        if (code === 200) {
          router.reload();
        }
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
              <td className="font-medium">Status</td>
              <td className="text-primary">{status}</td>
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
            <button
              className={
                status === "Adopted"
                  ? "hidden"
                  : "w-16 md:w-20 text-md md:text-lg rounded-lg font-Poppins bg-primary"
              }
            >
              Edit
            </button>
          </Link>
          <button
            onClick={(e) => handleDone(e)}
            className={
              status === "Adopted"
                ? "hidden"
                : "w-16 md:w-20 text-md md:text-lg rounded-lg font-Poppins bg-primary"
            }
          >
            Done
          </button>
          <button
            onClick={(e) => handleCancel(e)}
            className={
              status === "Adopted"
                ? "hidden"
                : "w-16 md:w-20 text-md md:text-lg rounded-lg font-Poppins bg-red-500"
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function MyInvitationCard({ date, time, status, place, petname, ownername }) {
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
              <td className="font-medium">Status</td>
              <td className="text-primary">{status}</td>
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
