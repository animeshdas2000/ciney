import React, { ReactNode } from "react";
import NavBar from "./Nav";
import Footer from "./Footer";

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
