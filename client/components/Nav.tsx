import React from "react";
import { Navbar, Button } from "flowbite-react";
function NavBar() {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
            Ciney.
          </span>
        </Navbar.Brand>

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
