import "../styles/globals.css";
import TanstackQueryProvider from "../providers/TanstackQueryProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = getCookie("token");

    if (
      !token &&
      router.pathname !== "/login" &&
      router.pathname !== "/registration"
    ) {
      router.push("/login");
    } else {
      setIsAuthenticated(!!token);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <TanstackQueryProvider>
      <Component {...pageProps} />
    </TanstackQueryProvider>
  );
}

export default MyApp;
