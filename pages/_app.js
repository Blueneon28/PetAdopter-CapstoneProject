import { useEffect, useMemo, useState } from "react";
import "../styles/globals.css";
import { ThemeContext } from "../utils/context";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={background}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp;
