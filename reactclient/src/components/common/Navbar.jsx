// src/components/common/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BNavbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

const AppNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <BNavbar bg="dark" variant="dark" expand="lg">
            <div className="container">
                <BNavbar.Brand as={Link} to="/">Financial Management System</BNavbar.Brand>
                <BNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BNavbar.Collapse id="basic-navbar-nav">
                    {user && ( 
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/clients">Clients</Nav.Link>
                            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
                            <Nav.Link as={Link} to="/accounts">Accounts</Nav.Link>
                            <Nav.Link as={Link} to="/invoices">Invoices</Nav.Link>
                        </Nav>
                    )}
                    <Nav>
                        {user ? (
                            <>
                                <Nav.Item className="me-2 text-white d-flex align-items-center">
                                    Signed in as: {user.email}
                                </Nav.Item>
                                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button as={Link} to="/login" variant="outline-light" className="me-2">Login</Button>
                                <Button as={Link} to="/register" variant="outline-success">Register</Button>
                            </>
                        )}
                    </Nav>
                </BNavbar.Collapse>
            </div>
        </BNavbar>
    );
};

export default AppNavbar;
