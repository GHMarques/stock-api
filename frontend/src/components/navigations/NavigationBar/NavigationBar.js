import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { NavigationBarStyled } from './NavigationBarStyled';

export const NavigationBar = () => (
  <NavigationBarStyled>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Stock</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="ml-auto">
          <Nav.Item>
            <div className="nav-link">
              <Link to="/editProduct">Create Product</Link>
            </div>
          </Nav.Item>
          <Nav.Item>
            <div className="nav-link">
              <Link to="/listProduct">List Product</Link>
            </div>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </NavigationBarStyled>
)