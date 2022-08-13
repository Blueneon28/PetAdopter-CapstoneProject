import Image from "next/image";
import Link from "next/link";
import google from "../../assets/img/logo-google.png";

function SmallButton({ id, label, onClick, loading, href, className }) {
  return (
    <Link href={`${href}`}>
      <button
        className={`${className} w-20 bg-primary text-white py-1 rounded-lg font-Poppins font-bold ${
          loading && "cursor-not-allowed"
        }`}
        id={id}
        onClick={onClick}
        disabled={loading}
      >
        {label}
      </button>
    </Link>
  );
}

function LargeButton({ id, label, onClick, loading, className }) {
  return (
    <button
      className={`${className} w-72 bg-primary text-white font-Poppins text-lg py-1 rounded-lg font-bold ${
        loading && "cursor-not-allowed"
      }`}
      id={id}
      onClick={onClick}
      disabled={loading}
    >
      {label}
    </button>
  );
}

function GoogleButton({ id, label, onClick, loading }) {
  return (
    <button id={id} onClick={onClick} disabled={loading}>
      <div className="w-72 bg-blue-500 flex text-white border-2 border-blue-500 items-center font-Poppins text-lg font-medium">
        <div className="bg-white p-1 flex">
          <Image src={google} width={20} height={20} />
        </div>
        <div className="w-full px-3 flex justify-center">{label}</div>
      </div>
    </button>
  );
}

export { SmallButton, LargeButton, GoogleButton };
