import "./index.css";
import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
  } from './navbarElements';

const Navbar = ({ isLoggedIn }) => {

    const handleLogout = () => {
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("loggedInUserFirstName");
        window.location.reload(false);
    };

    return (        
        <>
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to='/'>
                    Home
                </NavLink>
                { sessionStorage.getItem("jwtToken") && sessionStorage.getItem("loggedInUserFirstName") ? 
                    <div>
                        <NavLink to="/" onClick={() => handleLogout()}>Logout</NavLink>
                    </div>
                : 
                    <div>
                        <NavLink to='/signup'>Sign Up</NavLink> 
                        <NavLink to='/login'>Login</NavLink>
                    </div>
                }
            </NavMenu>
        </Nav>
        </>
    )    
    
    }

export default Navbar;