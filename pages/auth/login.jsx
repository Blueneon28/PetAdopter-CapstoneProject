import Image from "next/image";
import { useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

import logo from "../../assets/img/logo-petdopter.png";
import { CustomInput } from "../../components/CustomInput";
import { LoginButton, GoogleButton } from "../../components/CustomButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
    };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(
      "https://virtserver.swaggerhub.com/Capstone-tim1/PetAdopter-tim1/1.0.0/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { code, message, data } = result;
        if (code === 200 && data.role === "user") {
          const { token } = data;
          setCookie("token", token);
          router.push("/");
        }
        if (code === 200 && data.role === "admin") {
          const { token } = data;
          setCookie("token", token);
          router.push("/admin");
        }
        alert(message);
      })
      .catch((err) => {
        alert(err.toString());
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
            <div className="grid grid-cols-1 justify-items-center gap-5">
              <CustomInput
                id="inputEmail"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomInput
                id="inputPassword"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <LoginButton
                  id="loginButton"
                  type="submit"
                  label="Login"
                  loading={loading || disabled}
                />
                <div className="mt-2 flex space-x-1 justify-center ">
                  <p className="opacity-30">Don't have an account?</p>
                  <Link href="/auth/register">
                    <a>Sign up here</a>
                  </Link>
                </div>
                <p className="flex justify-center opacity-30 pb-1">or</p>
                <GoogleButton label="Continue with Google" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
