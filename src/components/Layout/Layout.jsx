import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import ChatBot from "../ChatBot/ChatBot";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ChatBot />
      <Footer />
    </>
  );
};

export default Layout;
