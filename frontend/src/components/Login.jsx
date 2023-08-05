import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import '../login.css'
import quepng from '../background/question.png';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here

    try {
      const url = `http://localhost:8000/signin`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email, password: user.password })
      })

      const json = await response.json();
      console.log(json);
      if (json.success === "true") {
        // alert('Successfull');
        // Save the auth token and redirect
        localStorage.setItem('token', json.token);
        console.log(user);
        navigate('/upload'); // Navigate to upload page after successful login
      }
      else if (json.success === "false") {
        alert('invalid credential');
      }
    } catch (error) {
        console.log(error);
    }

  };

  return (
    <div className="login-container">
      {/* <div className="login-image"> HI there</div> */}
      <div className="login-form">
        <h2>Login</h2>
        <form style={{padding: '8px 30px'}} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              style={{border: '1px solid black',backgroundColor: '#d6cdd4'}}
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              style={{border: '1px solid black',backgroundColor: '#d6cdd4'}}
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='btn'>Login</button>
        </form>
        <Link to='/register' style={{color:'blue'}}>New User?</Link>
      </div>
      <img className="login-image" src={quepng} alt="Cat" />
    </div>
  );
};

export default Login;
