import { setCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Redirect() {
  const router = useRouter();
  useEffect(() => {
    const keysvalue = location.search;
    const result = new URLSearchParams(keysvalue);
    const token = result.get("token");
    const tokenoauth = result.get("tokenoauth");
    const role = result.get("role");

    if (token) {
      setCookie("token", token);
      setCookie("tokenoauth", tokenoauth);
      role === "user" ? router.replace("/") : router.replace("/admin");
    } else {
      router.replace("/auth/login");
    }
  }, []);
  return;
}
