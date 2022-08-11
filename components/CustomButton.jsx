import Image from "next/image";
import google from "../assets/img/logo-google.png";

function PrimaryButton({ id, label, onClick, type, loading }) {
  return (
    <button
      className="w-72 bg-primary text-white py-1 rounded-lg font-Poppins font-bold"
      id={id}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {label}
    </button>
  );
}

function AccentButton({ id, label, onClick, type, loading }) {
  return (
    <button
      className="w-72 bg-accent py-1 rounded-lg font-Poppins font-bold"
      id={id}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {label}
    </button>
  );
}

function LoginButton({ id, label, onClick, type, loading }) {
  return (
    <button
      className="w-72 bg-primary text-white font-Poppins text-lg py-1 rounded-lg font-bold"
      id={id}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {label}
    </button>
  );
}

function SignupButton({ id, label, onClick, type, loading }) {
  return (
    <button
      className="w-72 bg-accent text-white font-Poppins py-1 rounded-lg font-bold"
      id={id}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {label}
    </button>
  );
}

function GoogleButton({ id, label, onClick, type, loading }) {
  return (
    <button
      className="w-72 py-1 font-Poppins font-bold border-2 border-black flex justify-center gap-2"
      id={id}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      <Image src={google} width={23} height={23} />
      {label}
    </button>
  );
}

export { PrimaryButton, AccentButton, LoginButton, SignupButton, GoogleButton };
