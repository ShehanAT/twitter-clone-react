import "./index.css";
import React, { useState, useEffect } from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
  } from './navbarElements';

const Navbar = ({ isLoggedIn }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

 
  

    let registerTab = <NavLink to='/signup'>Sign Up</NavLink>;
    let loginTab = <NavLink to='/login'>Login</NavLink>;
    let logoutTab = <NavLink to="/" onClick={() => handleLogout()}>Logout</NavLink>;
    // console.log("isLoggedIn: " + isLoggedIn);

    useEffect(() => {
        const savedJwtToken = sessionStorage.getItem("jwtToken") 
        const loggedInUserFirstName = sessionStorage.getItem("loggedInUserFirstName");
        if(savedJwtToken && loggedInUserFirstName && savedJwtToken !== "null" && loggedInUserFirstName !== "null"){
            setIsUserLoggedIn(true);
        }
        console.log(savedJwtToken);
        console.log(loggedInUserFirstName);

        // if(isLoggedIn){
        //     logoutTab = <NavLink to="/" onClick={() => handleLogout()} >Logout</NavLink>
        // }else{
        //     registerTab = <NavLink to='/signup'>Sign Up</NavLink>
        //     loginTab = <NavLink to='/login'>Login</NavLink>
        // }
    }, []);

    const handleLogout = () => {
        console.log("passing handleLogout()");
        setIsUserLoggedIn(false);
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("loggedInUserFirstName");
        console.log("isLoggedIn: " + isLoggedIn);
    };

    return (        
        <>
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to='/'>
                    Home
                </NavLink>
                { !isLoggedIn && registerTab } 
                { !isLoggedIn && loginTab }
                { isLoggedIn && logoutTab }
            </NavMenu>
        </Nav>
        </>
    )    
    
    }

export default Navbar;