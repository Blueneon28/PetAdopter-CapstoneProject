import Image from "next/image";
import Link from "next/link";

export default function ApplierCard({ id, name, image, ownername, petname }) {
  return (
    <div className="p-2 border-2 border-[#70BAC6] dark:border-[#568C95] rounded-xl">
      <div className="flex items-center">
        <Link href={`/appliers/${id}`}>
          <div className="w-2/5">
            <div className="w-24 h-24 rounded-full border border-[#70BAC6] dark:border-[#568C95]">
              {/* <Image src={image} alt={name} width={50} height={80} /> */}
              <img src={image} alt={name} />
            </div>
          </div>
        </Link>
        <div className="w-full flex flex-col mx-3">
          <Link href={`/appliers/${id}`}>
            <h1 className="font-bold text-lg">{name}</h1>
          </Link>
          <div className="text-xs py-2">
            <p>
              &quot;Hello <span className="font-bold">{ownername}</span>, can I
              adopt <span className="font-bold">{petname}</span>?&quot;
            </p>
          </div>
          <div className="flex justify-between">
            <button className="w-1/2 rounded-full bg-[#FFC700] dark:bg-[#CDA000] text-white font-medium text-xs p-1">
              Accept
            </button>
            <button className="w-1/2 ml-4 rounded-full bg-[#D98481] dark:bg-[#AF6C6A] text-white font-medium text-xs p-1">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
