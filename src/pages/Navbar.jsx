import { styled } from '@mui/system';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TransparentNavbar = styled(Navbar)(({ theme }) => ({
    backgroundColor: 'transparent !important',
    borderBottom: 'none',
    backdropFilter: 'blur(10px)',
    boxShadow: 'none',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
    '& .navbar-brand, & .nav-link': {
        color: '#007bff !important', 
        textDecoration: 'none', 
    },
    '& .navbar-brand:hover, & .nav-link:hover': {
        color: '#0056b3 !important',
    },
    '& .nav-link:focus, & .nav-link:active': {
        outline: 'none', 
        boxShadow: 'none', 
        backgroundColor: 'transparent', 
    }
}));

function NavBar() {
    return (
        <TransparentNavbar bg="light" variant="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Gestion de Patrimoine</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                    <Nav.Link as={Link} to="/possession">Possession</Nav.Link>
                    <Nav.Link as={Link} to="/patrimoine">Patrimoine</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </TransparentNavbar>
    );
}

export default NavBar;
