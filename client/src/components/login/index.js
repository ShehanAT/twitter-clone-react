import { useState } from 'react';
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
import 'react-toastify/dist/ReactToastify.css';
import { apolloClient } from '../../App';




const Login = () => {
 
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    // States for checking the errors
    const [ submitted, setSubmitted ] = useState(false);
    
    const [emptyFieldsErrorMessage, setEmptyFieldsErrorMessage] = useState(false);


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
   
    const handleLoginClick = async (e) => {
      e.preventDefault();
      const loginResult = await apolloClient.query({
        query: USER_LOGIN_QUERY,
        variables: { email: email, password: password },
      });
      console.log("LoginResult: \n");
      console.log(loginResult);
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
        <Form >
        {/* Labels and inputs for form data */}
            <FormGroup row>
            <Label className="label">Email</Label>
            <Input  className="input"
             type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </FormGroup> 
            
            <FormGroup row>
            <Label className="label">Password</Label>
            <Input  className="input"
                 type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </FormGroup>

            <Button onClick={handleLoginClick} className="btn btn-primary submit-btn" type="submit">
            Submit
            </Button>
        </Form>
       </div>
    );
  }
  
  export default Login;