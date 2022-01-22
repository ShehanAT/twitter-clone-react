import React, { useState } from "react";
import { reduxForm } from "redux-form";
import { Form, Button, Error } from "../styles/signin";
import { 
    USER_LOGIN_QUERY
} from '../graphql'; 
import { 
    Input
  } from 'reactstrap';
import { apolloClient } from '../../App';
import { useNavigate } from 'react-router-dom';


const validate = (data) => {
  const errors = {};
  if (!data.user) errors.user = "Username/Email required";
  if (!data.password) errors.password = "Password required";
  else if (data.password.length < 8)
    errors.password = "Min length of password: 8";
  return errors;
};

// const Input = ({ input, type, placeholder, meta: { touched, error } }) => (
//   <React.Fragment>
//     <input {...input} type={type} placeholder={placeholder} />
//     {touched && error && <Error>{error}</Error>}
//   </React.Fragment>
// );

let LoginForm = (props) => {
 
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [ submitted, setSubmitted ] = useState(false);

    const [emptyFieldsErrorMessage, setEmptyFieldsErrorMessage] = useState(false);

    const navigate = useNavigate();
 
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
        if(loginResult && loginResult.data && loginResult.data.login){
            const jwtToken = loginResult.data.login.token;
            const userFirstName = loginResult.data.login.userFirstName;
            const userId = loginResult.data.login.userId;

            sessionStorage.setItem("jwtToken", jwtToken);
            sessionStorage.setItem("loggedInUserFirstName", userFirstName);
            sessionStorage.setItem("loggedInUserId", userId);
            
            
            navigate("/home");
            window.location.reload(false);

        }
    }


    const { credentialError, loginDisabled } = props;
    return (
        <Form isLogin>
            <div>
            {/* <Field
                type="text"
                name="user"
                component={Input}
                placeholder="Username or email"
            /> */}
            <Input  
                className="input"
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                placeholder="Email" 
             />

          
            {credentialError.user && <Error>{credentialError.user}</Error>}
            </div>
            <div>
            {/* <Field
                type="password"
                name="password"
                component={Input}
                placeholder="password"
            /> */}
            <Input  
                className="input"
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
                placeholder="Password" 
            />
            {credentialError.password && (
                <Error> 
                {showEmptyFieldsErrorMessage()}
                {successMessage()}
                {/* {credentialError.password} */}
                </Error>
            )}
            </div>
            <span
            style={{
                display: "flex",
                alignItems: "center",
                margin: "0",
                height: "50px",
            }}
            >
            <Button
                type="submit"
                bg="rgb(255,255,255)"
                color="rgb(29, 161, 242)"
                hovbg="rgba(29,161,242,0.1)"
                disabled={loginDisabled}
                onClick={handleLoginClick}
            >
                {loginDisabled ? "Logging in" : "Log in"}
            </Button>
            </span>
        </Form>
    );
};

LoginForm = reduxForm({
  form: "login",
  validate,
})(LoginForm);

export default LoginForm;