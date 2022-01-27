import React, { useState } from 'react';
import "./index.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col } from "antd";
import { LogoWrapper, Motto, Button, Flex } from "../styles/signin";
import { logo, motto } from "./paths";
import Icon from "../icon";
import LoginForm from "./loginForm";
import Modal from "../modal";
import SignupForm from "./signupForm";


const Signup = () => {

  const [loginDisabled, setLoginDisabled] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [credentialError, setCredentialError] = useState({
    user: null,
    password: null,
  });
  const [userError, setUserError] = useState({
    username: null,
    email: null,
  });

  toast.configure();
  // useCallback() returns a memoized callback. Memoization is an optimization technique used primarily to speed up computer programs by storing the results for expensive function calls and returning the cached result when the same inputs occur again.
  // useCallback() also returns the same function instance between renderings(aka memoization)
  // as long as addUser, firstName, lastName, etc variable values are the same, useCallback() does not submit the form. If one or more of the values change then the form is submitted
  

  const handleSubmit = async (data) => {
    try {
      setLoginDisabled(true);
      // const login = await axios.post(`${URL}/user/login-user`, data);
      // setCredentialError({ user: null, password: null });
      // setLoginDisabled(false);
      // dispatch({ type: SET_USER, payload: login.data.user });
      // dispatch({ type: SET_THEME, payload: "default" });
      // history.push("/home");
    } catch (err) {
      setCredentialError(err.response.data);
      setLoginDisabled(false);
    }
  };

  const handleSignupSubmit = async (data) => {
    try {
      setLoginDisabled(true);
      // call GraphQL mutation 'createUser()'
    }catch(err){
      setUserError(err.response.data.errors);
      setLoginDisabled(false);
    }
  }
 
  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
}
 
 
  return (
    <React.Fragment>
    {isModalOpen && (
      <Modal
        children={
          <SignupForm 
            onSubmit={handleSignupSubmit}
            userError={userError}
            loginDisabled={loginDisabled}
            handleModalClose={() => setIsModalOpen(!isModalOpen)}/>
        }
        handleClose={() => setIsModalOpen(!isModalOpen)}
        padding="15px"
      />
    )}

    {isLoginModalOpen && (
            <Modal
              children={
              <LoginForm
                onSubmit={handleSubmit}
                credentialError={credentialError}
                loginDisabled={loginDisabled} />
              }
              handleClose={handleLoginModalClose}
              padding="15px"
            />
    )}
    <Row style={{ display: 'flex' }}>
      <Col
        md={12}
        xs={24}
        style={{ overflow: "hidden", position: "relative" }}
      >
        <LogoWrapper>
          <Icon d={logo} height="130vh" fill="rgb(29,161,242)" />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {motto.map((item) => (
              <Motto key={item.text}>
                <Icon
                  d={item.path}
                  width="28.75px"
                  height="28.75px"
                  fill="rgb(255,255,255)"
                />
                <span>{item.text}</span>
              </Motto>
            ))}
          </div>
        </LogoWrapper>
      </Col>
      <Col md={12} xs={24} style={{ padding: "15px" }}>
        {/* <LoginForm
          onSubmit={handleSubmit}
          credentialError={credentialError}
          loginDisabled={loginDisabled}
        /> */}
        <Flex>
          <div>
            <Icon
              d={logo}
              width="41.25px"
              height="41.25px"
              fill="rgb(29,161,242)"
            />
            <h1>See what's happening in the world right now</h1>
            <p>Join twitter today.</p>
            <Col>
              <Button
                bg="rgb(29,160,240)"
                color="rgb(255,255,255)"
                hovbg="rgb(26, 146, 220)"
                onClick={() => setIsModalOpen(!isModalOpen)}
                style={{ margin: "15px" }}
              >
                Sign Up
              </Button>
              <Button
                bg="rgb(29,160,240)"
                color="rgb(255,255,255)"
                hovbg="rgb(26, 146, 220)"
                onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
                style={{ margin: "15px" }}
              >
                Sign In 
              </Button>
            </Col>
          </div>
        </Flex>
      </Col>
    </Row>
  </React.Fragment>
  );
}

export default Signup;