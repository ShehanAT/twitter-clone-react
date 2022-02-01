import React, { useState, useCallback } from "react";
import { reduxForm } from "redux-form";
import { Form, Button, Error } from "../styles/signin";
import { 
    FormGroup,
    Label,
    Input
  } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { 
    CREATE_USER_MUTATION,
} from '../graphql'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./signupForm.css";

const validate = (data) => {
  const errors = {};
  if (!data.firstname) errors.firstname = "Firstname required";
  if (!data.lastname) errors.lastname = "Lastname required";
  if (!data.username) errors.username = "username required";
  if (!data.email) errors.email = "Email required";
  if (!data.dob) errors.dob = "Date of birth required";
  if (!data.password) errors.password = "Password required";
  else if (data.password.length < 8)
    errors.password = "Min length of password: 8";
  else if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Password do not match";

  return errors;
};

let SignupForm = (props) => {

    // States for registration
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState(0);

    // States for checking the errors
    const [submitted] = useState(false);

    const [emptyFieldsErrorMessage, setEmptyFieldsErrorMessage] = useState(false);
    const [passwordsNotMatchingErrorMessage, setPasswordsNotMatchingErrorMessage] = useState(false);

    const navigate = useNavigate();


    // useMutation() is the primary API for executing queries in an Apollo application
    const [addUser] = useMutation(CREATE_USER_MUTATION);

    const handleSignupFormSubmit = useCallback(
        (e) => {
        e.preventDefault();
        if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
            setEmptyFieldsErrorMessage(true);
            setPasswordsNotMatchingErrorMessage(false);
        } 
        else {
            if(password !== confirmPassword){
            setPasswordsNotMatchingErrorMessage(true);
            setEmptyFieldsErrorMessage(false);
            }else{
            addUser({
                variables: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                age: age,
                password: password
                }
            });
            props.handleModalClose();
            toast("User Registration Successful");
            // navigate("/login");
            }
        } 
        },
        [addUser, firstName, lastName, email, password, confirmPassword, age],
    );

    const { userError, loginDisabled } = props;

    // Showing success message
    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h1>User {firstName} {lastName} successfully registered!!</h1>
        </div>
        );
    };

    return (
        <form 
            onSubmit={handleSignupFormSubmit} 
          
        >
        <Form className="signup-form-input-container">
                {/* Labels and inputs for form data */}
                <FormGroup row>
                <Label className="label">First Name</Label>
                <Input onChange={(e) => setFirstName(e.target.value)} className="input"
                value={firstName} type="text" placeholder="First Name"/>
                </FormGroup>
        
                <FormGroup row >
                <Label className="label">Last Name</Label>
                <Input onChange={(e) => setLastName(e.target.value)} className="input"
                value={lastName} type="text" placeholder="Last Name"/>
                </FormGroup>
        
                <FormGroup row className="signup-form-input-secondary">
                <Label className="label">Email</Label>
                <Input onChange={(e) => setEmail(e.target.value)} className="input"
                value={email} type="email" placeholder="Email"/>
                </FormGroup> 
                
                <FormGroup row className="signup-form-input-secondary">
                <Label className="label">Password</Label>
                <Input onChange={(e) => setPassword(e.target.value)} className="input"
                    value={password} type="password" placeholder="Password"/>
                </FormGroup>
        
                <FormGroup row className="signup-form-input-secondary">
                <Label className="label">Confirm Password</Label>
                <Input onChange={(e) => setConfirmPassword(e.target.value)} className="input"
                    value={confirmPassword} type="password" placeholder="Confirm Password"/>
                </FormGroup>
        
                <FormGroup row className="signup-form-input-secondary">
                <Label className="label">Age</Label>
                <Input onChange={(e) => setAge(e.target.value)} className="input"
                    value={age} type="number" placeholder="Age"/>
                </FormGroup>
            </Form>
        <Button
            type="submit"
            bg="rgb(255,255,255)"
            color="rgb(29, 161, 242)"
            hovbg="rgba(29,161,242,0.1)"
            disabled={loginDisabled}
            id="submitButton"
        >
            Sign Up
        </Button>
        </form>
    );
};

SignupForm = reduxForm({
  form: "signup",
  validate,
})(SignupForm);

export default SignupForm;