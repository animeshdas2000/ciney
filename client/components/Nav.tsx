import React from "react";
import { Navbar, Button } from "flowbite-react";
function NavBar() {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button>Get started</Button>
          <Navbar.Toggle />
        </div>
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
