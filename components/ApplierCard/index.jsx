import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ApplierCard({
  id,
  adoptionid,
  seekerid,
  seekername,
  seekerimage,
  ownername,
  petname,
  status,
  token,
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleAccept = async (e) => {
    setLoading(true);
    e.preventDefault();

    const body = {
      status: "Accepted",
    };

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
        const { code, message } = result;
        if (code === 200) {
          router.reload();
        }
        alert(message);
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };

  const handleReject = async (e) => {
    setLoading(true);
    e.preventDefault();

    const body = {
      status: "Rejected",
    };

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
        const { code, message } = result;
        if (code === 200) {
          router.reload();
        }
        alert(message);
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };
  return (
    <div className="p-2 border-2 border-[#70BAC6] dark:border-[#568C95] rounded-xl">
      <div className="flex items-center">
        <Link href={`/appliers/${seekerid}`}>
          <button type="button" className="w-2/5">
            <div className="w-24 h-24 rounded-full border border-[#70BAC6] dark:border-[#568C95]">
              <Image
                src={seekerimage}
                alt={seekername}
                width={1000}
                height={1000}
                fill="responsive"
                className="rounded-full"
              />
            </div>
          </button>
        </Link>
        <div className="w-full flex flex-col mx-3">
          <Link href={`/appliers/${seekerid}`}>
            <button type="button" className="font-bold text-lg text-left">
              {seekername}
            </button>
          </Link>
          <div className="text-xs py-2">
            <p>
              &quot;Hello <span className="font-bold">{ownername}</span>, can I
              adopt <span className="font-bold">{petname}</span>?&quot;
            </p>
          </div>
          {status === "Requested" ? (
            <div className="flex justify-between">
              <button
                className="w-1/2 rounded-full bg-[#FFC700] dark:bg-[#CDA000] text-white font-medium text-xs p-1"
                onClick={(e) => handleAccept(e)}
              >
                Accept
              </button>
              <button
                className="w-1/2 ml-4 rounded-full bg-[#D98481] dark:bg-[#AF6C6A] text-white font-medium text-xs p-1"
                onClick={(e) => handleReject(e)}
              >
                Reject
              </button>
            </div>
          ) : status === "Accepted" ? (
            <Link href={`/meetings/add/${adoptionid}`}>
              <button className="w-full rounded-full bg-[#DDFFF9] dark:bg-[#9EC8C1] text-black dark:text-white font-medium text-xs p-1">
                Create Meeting Appointment
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
