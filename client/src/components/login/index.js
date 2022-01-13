import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { 
    Form,
    FormGroup,
    Label,
    Input,
    Button 
  } from 'reactstrap';
import { 
    USER_LOGIN_QUERY
} from '../graphql'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
 
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    
    const { loginResult, refetch } = useQuery(USER_LOGIN_QUERY, { variables: { email: email, password: password }, enabled: false, refetchOnWindowFocus: false });

    const [emptyFieldsErrorMessage, setEmptyFieldsErrorMessage] = useState(false);

    // Handling the form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      if (email === '' || password === '') {
        setError(true);
      } else {
        setSubmitted(true);
        setError(false);
      }
    };
   
    const useLoginFormSubmit = (e) => { 
        // useCallback(
        // (e) => {
          e.preventDefault();
          if (email === '' || password === '') {
            showEmptyFieldsErrorMessage(true);
          } 
          else {
           
            // login({
            //     variables: {
            //         email: email,
            //         password: password
            //     }
            // });
            // toast("User Registration Successful");
            // navigate("/login");
          } 
        }
        // [login, email, password],
    // );

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

    // Showing success message
    const successMessage = () => {
      return (
        <div
          className="success"
          style={{
            display: submitted ? '' : 'none',
          }}>
          <h1>User successfully logged in!</h1>
        </div>
      );
    };
   
    const handleLoginClick = () => {
        console.log("passing handleLoginClick()");
        refetch();
    }
   
    return (
      <div className="form">
        <div>
          <h1>User Login</h1>
        </div>
   
        {/* Calling to the methods */}
        <div className="messages">
          {showEmptyFieldsErrorMessage()}
          {successMessage()}
        </div>
   
        <Form onSubmit={useLoginFormSubmit}>
        {/* Labels and inputs for form data */}
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

            <Button onClick={handleLoginClick} className="btn btn-primary submit-btn" type="submit">
            Submit
            </Button>
        </Form>
       </div>
    );
  }
  
  export default Login;