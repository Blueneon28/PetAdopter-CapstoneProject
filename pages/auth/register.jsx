import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { CustomInput, CustomInputComboBox } from "../../components/CustomInput";
import { LargeButton, GoogleButton } from "../../components/CustomButton";

export default function Register() {
  const router = useRouter();
  const [fullname, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [address, setFullAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      fullname &&
      city &&
      address &&
      username &&
      email &&
      phonenumber &&
      password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fullname, city, address, username, email, phonenumber, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      fullname,
      city,
      address,
      username,
      email,
      phonenumber,
      photoprofile: "/photo.png",
      password,
    };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("https://golangprojectku.site/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        if (result.code === 200) {
          router.push("/auth/login");
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
      <div className="w-screen h-screen grid items-center text-md md:text-2xl font-Poppins">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center">
          <div className="lg:hidden grid justify-items-center pb-4 ">
            <Image
              src="/logo-petdopter.png"
              alt="logo"
              width={200}
              height={200}
            />
            <p className=" font-bold italic text-primary">
              "Adopt the cutest pet near you
            </p>
            <p className=" font-bold italic text-primary">as your playmate!"</p>
          </div>
          <div className="hidden lg:grid justify-items-center pb-4 ">
            <Image
              src="/logo-petdopter.png"
              alt="logo"
              width={400}
              height={400}
            />
            <p className=" font-bold italic text-primary">
              "Adopt the cutest pet near you
            </p>
            <p className=" font-bold italic text-primary">as your playmate!"</p>
          </div>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-1 justify-items-center gap-4">
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
                <LargeButton
                  className="bg-accent text-white font-semibold"
                  id="signupButton"
                  type="submit"
                  label="Sign up"
                  loading={loading || disabled}
                />
              </div>
            </form>
            <div className="flex gap-1 justify-center py-3">
              <p className="opacity-30">Already have an account?</p>
              <Link href="/auth/login">
                <a className="text-secondary">Log in here</a>
              </Link>
            </div>
            <div className="divider flex justify-center">or</div>
            <div className="pt-2">
              <GoogleButton
                label="Sign up with Google"
                href="https://golangprojectku.site/oauth/signup"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
