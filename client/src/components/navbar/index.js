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

    // console.log("isLoggedIn: " + isLoggedIn);

    useEffect(() => {
        const savedJwtToken = sessionStorage.getItem("jwtToken") 
        const loggedInUserFirstName = sessionStorage.getItem("loggedInUserFirstName");
        // if(savedJwtToken && loggedInUserFirstName && savedJwtToken !== "null" && loggedInUserFirstName !== "null"){
        //     setIsUserLoggedIn(true);
        // }
        // console.log(savedJwtToken);
        // console.log(loggedInUserFirstName);
        // if()
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
                {/* { !isLoggedIn && registerTab } 
                { !isLoggedIn && loginTab }
                { isLoggedIn && logoutTab } */}
            </NavMenu>
        </Nav>
        </>
    )    
    
    }

export default Navbar;