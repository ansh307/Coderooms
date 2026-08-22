import Footer from "@/components/landing/ui/Footer";
import Navbar from "@/components/landing/ui/Navbar";
import React from "react";

const PublicOnlyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default PublicOnlyLayout;
