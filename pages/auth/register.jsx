import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import logo from "../../assets/img/logo-petdopter.png";
import { CustomInput, CustomInputComboBox } from "../../components/CustomInput";
import { SignupButton, GoogleButton } from "../../components/CustomButton";

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      fullName &&
      city &&
      fullAddress &&
      username &&
      email &&
      phoneNumber &&
      password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fullName, city, fullAddress, username, email, phoneNumber, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      fullName,
      city,
      fullAddress,
      username,
      email,
      phoneNumber,
      password,
    };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("https://rubahmerah.site/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message, data } = result;
        if (result.code === 200) {
          if (data) {
            router.push("/login");
          }
        }
        alert(message);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  };

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
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="grid grid-cols-1 justify-items-center gap-2">
              <CustomInput
                id="inputFullName"
                type="text"
                placeholder="Full name"
                onChange={(e) => setFullName(e.target.value)}
              />
              <CustomInputComboBox
                id="inputCity"
                title="City"
                op1="Jakarta"
                op2="Malang"
                op3="Semarang"
                onChange={(e) => setCity(e.target.value)}
              />
              <CustomInput
                id="inputFullAddress"
                type="text"
                placeholder="Full address"
                onChange={(e) => setFullAddress(e.target.value)}
              />
              <CustomInput
                id="inputUsername"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <CustomInput
                id="inputEmail"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomInput
                id="inputPhoneNumber"
                type="number"
                placeholder="Phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <CustomInput
                id="inputPassword"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <SignupButton
                id="signupButton"
                type="submit"
                label="Sign up"
                loading={loading || disabled}
              />
              <div>
                <div className="flex space-x-1 justify-center ">
                  <p className="opacity-30">Already have an account?</p>
                  <Link href="/auth/login">
                    <a>Log in here</a>
                  </Link>
                </div>
                <p className="flex justify-center opacity-30 pb-1">or</p>
                <GoogleButton label="Sign up with Google" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
