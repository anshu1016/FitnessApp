import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/exercises">
            Exercise
          </Nav.Link>
          <Nav.Link as={Link} to="/goal">
            Goal
          </Nav.Link>
          <Nav.Link as={Link} to="/food">
            Food
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
