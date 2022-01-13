import { useState } from 'react';


const Login = () => {
 
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
      
    // Handling the email change
    const handleEmail = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
    };
   
    // Handling the password change
    const handlePassword = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
    };
   
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
   
    // Showing error message if error is true
    const errorMessage = () => {
      return (
        <div
          className="error"
          style={{
            display: error ? '' : 'none',
          }}>
          <h1>Invalid credentials! Please try again...</h1>
        </div>
      );
    };
   
    return (
      <div className="form">
        <div>
          <h1>User Login</h1>
        </div>
   
        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
   
        <form>
          {/* Labels and inputs for form data */}
          <label className="label">Email</label>
          <input onChange={handleEmail} className="input"
            value={email} type="email" />
   
          <label className="label">Password</label>
          <input onChange={handlePassword} className="input"
            value={password} type="password" />
   
          <button onClick={handleSubmit} className="btn btn-primary submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
  
  export default Login;