import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import search from '../background/search1.png';
import '../login.css'

const Register = () => {

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
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
        // Perform form submission or API call here

        try {
            const url = "http://localhost:8000/register";
            const response = await fetch(url, {
              method: "POST",
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(user)
            })
      
            const json = await response.json();     // the res of auth.js will return here
            console.log(json);
            // console.log(response);
      
            if(json.success === "true"){
                window.alert("User registered Successfully. Click okay to Login..");
                navigate("/login");     // navigate after clicking okay
      
                
            }
            else{
              window.alert(json.error);
            }
          } catch (error) {
            console.log("Error itthe");
          }
    };

    return (
        <div className="login-container">
            <div className="login-form" style={{padding:"0px 50px"}}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstname" style={{color:'black'}}>First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={user.firstname}
                        onChange={handleChange}
                        style={{border: '1px solid black',backgroundColor: '#d6cdd4'}}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname" style={{color:'black'}}>Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        style={{border: '1px solid black',backgroundColor: '#d6cdd4'}}
                        value={user.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" style={{color:'black'}}>Email</label>
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
                    <label htmlFor="password" style={{color:'black'}}>Password</label>
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
                <button type="submit" className="btnsignup" style={{marginBottom:"13px"}}>Sign Up</button>
            </form>
            </div>
            <img className="login-image" style={{transform: "scalex(-1)", paddingLeft:"34px"}} src={search} alt="Cat" />
        </div>
    )
}

export default Register