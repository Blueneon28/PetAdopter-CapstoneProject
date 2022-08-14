import Image from "next/image";
import Link from "next/link";

export default function AdoptionCard({
  petid,
  petname,
  petimage,
  city,
  ownername,
  status,
}) {
  return (
    <div className="p-2 border-2 border-[#70BAC6] dark:border-[#568C95] rounded-xl">
      <div className="flex items-center">
        <div className="w-2/5">
          {/* <Image src={image} alt={name} width={50} height={80} /> */}
          <img src={petimage} alt={petname} />
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
          {status === "Waiting" || status === "Requested" ? (
            <button className="w-full my-1 rounded-full bg-[#D98481] dark:bg-[#AF6C6A] text-white font-medium text-xs p-1">
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
