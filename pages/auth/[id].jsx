import { setCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Redirect() {
  const router = useRouter();
  useEffect(() => {
    const keysvalue = location.search;
    const result = new URLSearchParams(keysvalue);
    const token = result.get("token");
    const role = result.get("role");

    if (token) {
      setCookie("token", token);
      role === "user" ? router.replace("/") : router.replace("/admin");
    } else {
      router.replace("/auth/register");
    }
  }, []);
  return;
}
