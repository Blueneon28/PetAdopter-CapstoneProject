import Image from "next/image";
import { useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

import { CustomInput } from "../../components/CustomInput";
import { LargeButton, GoogleButton } from "../../components/CustomButton";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      username,
      password,
    };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("https://golangprojectku.site/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, message, data } = result;
        if (code === 200) {
          const { token } = data;
          setCookie("token", token);
          data.role === "user" ? router.push("/") : router.push("/admin");
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
      <div className="w-screen h-screen grid items-center text-md md:text-2xl lg:text-2xl font-Poppins">
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
          <div className="pb-2">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-1 justify-items-center gap-5">
                <CustomInput
                  id="inputUsername"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <CustomInput
                  id="inputPassword"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <LargeButton
                  id="loginButton"
                  type="submit"
                  label="Login"
                  loading={loading || disabled}
                  className="bg-primary font-bold text-white"
                />
              </div>
            </form>
            <div className="flex gap-1 justify-center pt-3">
              <p className="opacity-30">Don't have an account?</p>
              <Link href="/auth/register">
                <a className="text-secondary">Sign up here</a>
              </Link>
            </div>
            <div className="divider flex justify-center">or</div>

            <div>
              <GoogleButton label="Continue with Google" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
