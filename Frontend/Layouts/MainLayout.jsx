import React from "react";
import Nav from "../src/Components/Home/Nav";
import { Outlet } from "react-router-dom";
import { Footer } from "../src/Components/Home/Footer";
import { useState } from "react";

const MainLayout = () => {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div
      id="#"
      className="min-h-screen min-w-screen "
      onClick={() => setShowProfile(false)}
    >
      <Nav showProfile={showProfile} setShowProfile={setShowProfile} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
