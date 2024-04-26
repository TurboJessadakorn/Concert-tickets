import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps, router }: AppProps) {
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
    <AnimatePresence mode="wait" key={router.asPath}>
      <motion.div
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            opacity: 0,
          },
          animateState: {
            opacity: 1,
          },
          exitState: {},
        }}
      >
        <Head>
          <title>Concert tickets</title>
        </Head>
        <Sidebar isAdmin={isAdmin} toggleUserRole={toggleUserRole} />
        <Component {...pageProps} isAdmin={isAdmin} />
      </motion.div>
    </AnimatePresence>
  );
}