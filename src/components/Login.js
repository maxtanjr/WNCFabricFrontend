import React, { useState, useEffect, Fragment } from 'react'

import '../css/Login.css';

import Input from './ui/Input';
import Alert from './ui/Alert';

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [alert, setAlert] = useState({
        type: "d-none", message:""
    });

    // read json file
    const config = require('../config/config.json');
    // backend route to obtain JWT token
    const loginRoute = config.backendHost + ":" + config.backendPort + "/v1/signin";


    const handleSubmitLogin = (evt) => {
        evt.preventDefault();

        // grab all fields (evt.target) from the form
        const data = new FormData(evt.target);
        // get data from the form
        const payload = Object.fromEntries(data.entries());

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload),
        }

        fetch(loginRoute, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error){
                    console.log(data.error)

                    setAlert({
                        type: "alert-danger",
                        message: "Invalid login, please try again!"
                    })
                } else {

                    var loginJsonResponse = Object.values(data)[0]
                    // We convert the json to an array, then get the element we are interested in by calling its positional index
                    handleSessionChange(loginJsonResponse)

                    
                    // store the token on local storage to persist the session. Accepts key-value string pairs
                    window.localStorage.setItem("jwt", JSON.stringify(loginJsonResponse["jwt"]));
                    // store the username on local storage for tracking
                    window.localStorage.setItem("user", loginJsonResponse["user"]);

                    console.log("Logged in as " + loginJsonResponse["user"])

                    // re-route; push user back to the /admin page. history.push is from the react-router-dom package and is used to move the user from the current page to another one.
                    // It takes the first argument as a destination path and a second argument as a state, which can be used to pass data from one state to another.
                    props.history.push({
                        pathname: "/admin",
                    })
                }
            })
        
    }

    function handleSessionChange(loginCreds) {
        // set the JWT and username in the handleSessionChange function passed into props in AppFunc.js
        // This calls the handleSessionChange function in AppFunc.js, passing in the jwt token and username obtained in login
        props.handleSessionChange(loginCreds);
    }

    function hasError(key) {
        return errors.indexOf(key) !== -1;
    }

    function handleUsername(evt) {
        setUsername(evt.target.value);
    }

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }


    // rendering
    return (
        <Fragment>

            {/* Pass in alertType and alertMessage as arguments (props) in the Alert component Alert.js */}
            <Alert alertType = {alert.type} alertMessage = {alert.message} />

            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <div className='bg-light'>
                        <div className='login-card'>     
                            <form className='mt-3' onSubmit={handleSubmitLogin}>
                                <div className='login-action-box'>
                                    <Input 
                                        title={"Username"}
                                        type={"username"}
                                        name={"username"}
                                        handleChange={handleUsername}
                                    />
                                </div>

                                <div className='login-action-box'>

                                    <Input 
                                        title={"Password"}
                                        type={"password"}
                                        name={"password"}
                                        handleChange={handlePassword}
                                    />

                                </div>

                                <div className='mt-3'></div>

                                <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"40px"}}>
                                    <button className='btn submit-login-button'>Submit</button>   
                                </div>

                            </form>
                        </div>
                    </div>
            
            </div>

        </Fragment>
    )

}

export default Login;