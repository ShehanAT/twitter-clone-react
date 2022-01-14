import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import "./index.css";
import { 
  Form,
  FormGroup,
  Label,
  Input,
  Button 
} from 'reactstrap';
import { 
  CREATE_USER_MUTATION,
} from '../graphql'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
 
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
 
  // useMutation() is the primary API for executing queries in an Apollo application
  const [addUser] = useMutation(CREATE_USER_MUTATION);
  
  const navigate = useNavigate();

  toast.configure();

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
          toast("User Registration Successful");
          navigate("/login");
        }
      } 
    },
    [addUser, firstName, lastName, email, password, confirmPassword, age],
  );
 
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
 
  // Showing error message if error is true
  const showEmptyFieldsErrorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: emptyFieldsErrorMessage ? '' : 'none',
        }}>
        <h1 style=
          {{
            color: '#FF0000'
          }}
        >Please enter all the fields</h1>
      </div>
    );
  };

  const showPasswordsNotMatchingErrorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: passwordsNotMatchingErrorMessage ? '' : 'none',
        }}>
        <h1 style=
          {{
            color: '#FF0000'
          }}
        >Passwords do not match. Please try again...</h1>
      </div>
    );
  };
 
  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>
 
      {/* Calling to the methods */}
      <div className="messages">
        {showEmptyFieldsErrorMessage()}
        {showPasswordsNotMatchingErrorMessage()}
        {successMessage()}
      </div>
 
      <Form onSubmit={handleSignupFormSubmit}>
        {/* Labels and inputs for form data */}
        <FormGroup row>
          <Label className="label">First Name</Label>
          <Input onChange={(e) => setFirstName(e.target.value)} className="input"
          value={firstName} type="text" />
        </FormGroup>

        <FormGroup row>
          <Label className="label">Last Name</Label>
          <Input onChange={(e) => setLastName(e.target.value)} className="input"
          value={lastName} type="text" />
        </FormGroup>

        <FormGroup row>
          <Label className="label">Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} className="input"
          value={email} type="email" />
        </FormGroup> 
        
        <FormGroup row>
          <Label className="label">Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} className="input"
            value={password} type="password" />
        </FormGroup>

        <FormGroup row>
          <Label className="label">Confirm Password</Label>
          <Input onChange={(e) => setConfirmPassword(e.target.value)} className="input"
            value={confirmPassword} type="password" />
        </FormGroup>

        <FormGroup row>
          <Label className="label">Age</Label>
          <Input onChange={(e) => setAge(e.target.value)} className="input"
            value={age} type="number" />
        </FormGroup>

        <Button onClick={handleSignupFormSubmit} className="btn btn-primary submit-btn" type="submit">
          Submit
        </Button>

      </Form>
    </div>
  );
}

export default Signup;