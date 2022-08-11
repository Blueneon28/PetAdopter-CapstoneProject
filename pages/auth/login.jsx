import Image from "next/image";

import logo from "../../assets/img/logo-petdopter.png";
import { CustomInput } from "../../components/CustomInput";
import { LoginButton, GoogleButton } from "../../components/CustomButton";

export default function Login() {
  return (
    <>
      <div className="w-screen h-screen grid items-center text-sm font-Poppins">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-items-center">
          <div className="grid justify-items-center">
            <Image src={logo} alt="" width={150} height={200} />
            <p className=" font-bold italic text-primary">
              "Adopt the cutest pet near you
            </p>
            <p className=" font-bold italic text-primary">as your playmate!"</p>
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-5">
            <CustomInput
              id="inputEmail"
              type="email"
              placeholder="Email"
              // onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              id="inputPassword"
              type="password"
              placeholder="Password"
              // onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton id="loginButton" type="submit" label="Login" />
            <div>
              <div className="flex space-x-1 justify-center ">
                <p className="opacity-30">Don't have an account?</p>
                <p>Sign up here</p>
              </div>
              <p className="flex justify-center opacity-30 pb-1">or</p>
              <GoogleButton label="Continue with Google" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
