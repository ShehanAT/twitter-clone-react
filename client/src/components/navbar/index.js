import "./index.css";
import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
  } from './navbarElements';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [])

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