import React from "react";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { css } from "@emotion/react";

function NavBar() {
  return (
    <>
      <div className="text-center flex justify-evenly max-w-xl content-center mx-auto py-8 ">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/movies">Movies</Link>
      </div>
    </>
  );
}

export default NavBar;
