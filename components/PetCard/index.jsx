import Image from "next/image";
import Link from "next/link";

export default function PetCard({ id, name, image, city, gender, age }) {
  return (
    <div className="p-2 border-2 border-[#70BAC6] dark:border-[#568C95] rounded-xl">
      <div className="flex items-center">
        <div className="w-2/5">
          {/* <Image src={image} alt={name} width={50} height={80} /> */}
          <img src={image} alt={name} />
        </div>
        <div className="w-full flex flex-col mx-2">
          <h1 className="font-bold text-lg">{name}</h1>
          <div className="flex text-xs justify-between py-2">
            <h2 className="break-words">{city}</h2>
            <h2>{gender === 1 ? "Male" : "Female"}</h2>
            <h2>{age} months</h2>
          </div>
          <Link href={`/pets/${id}`}>
            <button className="w-full rounded-full bg-[#FFC700] dark:bg-[#CDA000] text-white font-medium text-xs p-1">
              See More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
