import React from "react";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { css } from "@emotion/react";

function NavBar() {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <Link href="/">
            <span
              css={css`
                cursor: pointer;
              `}
              className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
              Ciney.
            </span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
          <Navbar.Link href="/dashboard/movies">Movies</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
