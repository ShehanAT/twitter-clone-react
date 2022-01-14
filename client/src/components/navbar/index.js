import "./index.css";
import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
  } from './navbarElements';

const Navbar = () => {


    return (
        <>
        <Nav>
            <Bars />
    
            <NavMenu>
            <NavLink to='/'>
                Home
            </NavLink>
            <NavLink to='/signup'>
                Sign Up
            </NavLink>
            <NavLink to='/login'>
                Login
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
            </NavMenu>
        </Nav>
        </>
    )
}

export default Navbar;