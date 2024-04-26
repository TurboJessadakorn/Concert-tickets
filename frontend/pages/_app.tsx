import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isAdmin, setIsAdmin] = useState(true);

  // Toggle between admin and user
  const toggleUserRole = () => {
    const newAdminState = !isAdmin;
    setIsAdmin(newAdminState);
  };
  return (
    <>
      <Sidebar isAdmin={isAdmin} toggleUserRole={toggleUserRole} />
      <Component {...pageProps} isAdmin={isAdmin} />
    </>
  );
}
