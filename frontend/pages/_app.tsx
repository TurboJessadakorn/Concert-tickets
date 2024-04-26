import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const isAdminStored = localStorage.getItem('isAdmin');
    const initialAdminState = isAdminStored !== null ? JSON.parse(isAdminStored) : true;
    setIsAdmin(initialAdminState);
  }, []);

  // Toggle between admin and user
  const toggleUserRole = () => {
    const newAdminState = !isAdmin;
    setIsAdmin(newAdminState);

    // Save admin state to localStorage if available
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAdmin', JSON.stringify(newAdminState));
    }
  };

  return (
    <>
      <Sidebar isAdmin={isAdmin} toggleUserRole={toggleUserRole} />
      <Component {...pageProps} isAdmin={isAdmin} />
    </>
  );
}