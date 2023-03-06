import React from "react";
import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
    const HOST = 'http://localhost:5000';
    const navigate = useNavigate();
    const {showAlert} = props;

    const login = async(email, password) => {
        const response = await fetch(`${HOST}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            }
        );
        const json = await response.json();
        
        if(json.success) {
            localStorage.setItem('token', json.token);
            navigate("/");
            showAlert('success', 'Logged in Successfully');
        } else {
            showAlert('danger', 'Please enter correct email and password');
        }
    };

    const signup = async(name, email, password) => {
        const response = await fetch(`${HOST}/api/auth/createuser`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            }
        );
        const json = await response.json();
        
        if(json.success) {
            localStorage.setItem('token', json.token);
            navigate("/");
            showAlert('success', 'Logged in Successfully');
        } else {
            showAlert('danger', 'Unable to create user');
        }
    };

    return (
        <AuthContext.Provider value={{login, signup}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;