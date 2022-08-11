import Image from "next/image";

import logo from "../../assets/img/logo-petdopter.png";
import { CustomInput, CustomInputComboBox } from "../../components/CustomInput";
import { SignupButton, GoogleButton } from "../../components/CustomButton";

export default function Register() {
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
          <div className="grid grid-cols-1 justify-items-center gap-2">
            <CustomInput
              id="inputFullName"
              type="text"
              placeholder="Full name"
              //   onChange={(e) => setFullName(e.target.value)}
            />
            <CustomInputComboBox
              id="inputCity"
              title="City"
              op1="Jakarta"
              op2="Malang"
              op3="Semarang"
              //   onChange={(e) => setCity(e.target.value)}
            />
            <CustomInput
              id="inputFullAddress"
              type="text"
              placeholder="Full address"
              //   onChange={(e) => setFullAddress(e.target.value)}
            />
            <CustomInput
              id="inputUsername"
              type="text"
              placeholder="Username"
              //   onChange={(e) => setUsername(e.target.value)}
            />
            <CustomInput
              id="inputEmail"
              type="email"
              placeholder="Email"
              //   onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              id="inputPhoneNumber"
              type="number"
              placeholder="Phone number"
              //   onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <CustomInput
              id="inputPassword"
              type="password"
              placeholder="Password"
              //   onChange={(e) => setPassword(e.target.value)}
            />
            <SignupButton id="signupButton" type="submit" label="Sign up" />
            <div>
              <div className="flex space-x-1 justify-center ">
                <p className="opacity-30">Don't have an account?</p>
                <p>Sign up here</p>
              </div>
              <p className="flex justify-center opacity-30 pb-1">or</p>
              <GoogleButton label="Sign up with Google" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
