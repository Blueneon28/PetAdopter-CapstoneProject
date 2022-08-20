import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdoptionCard({
  token,
  adoptionid,
  petid,
  petname,
  petimage,
  city,
  ownername,
  status,
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCancel = async (e) => {
    setLoading(true);
    e.preventDefault();

    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
        <div className="w-2/5">
          <Image
            src={petimage}
            alt={petname}
            width={1200}
            height={1600}
            layout={"responsive"}
            className="rounded-md"
          />
        </div>
        <div className="w-full flex flex-col mx-2">
          <h3 className="text-right italic text-xs text-black dark:text-white">
            <span className="opacity-20">status: </span>
            <span
              className={
                status === "Adopted"
                  ? "text-[#70BAC6] dark:text-[#568C95]"
                  : status === "Accepted"
                  ? "text-[#FFC700] dark:text-[#CDA000]"
                  : status === "Rejected"
                  ? "text-[#D98481] dark:text-[#AF6C6A]"
                  : "text-black dark:text-white"
              }
            >
              {status}
            </span>
          </h3>
          <h1 className="font-bold text-lg">{petname}</h1>
          <div className="flex text-xs justify-between py-2">
            <h2 className="break-words">{city}</h2>
            <h2>{ownername}</h2>
          </div>
          <Link href={`/pets/${petid}`}>
            <button className="w-full rounded-full bg-[#FFC700] dark:bg-[#CDA000] text-white font-medium text-xs p-1">
              See More
            </button>
          </Link>
          {status === "Requested" ? (
            <button
              className="w-full my-1 rounded-full bg-[#D98481] dark:bg-[#AF6C6A] text-white font-medium text-xs p-1"
              onClick={(e) => handleCancel(e)}
            >
              Cancel Request
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
