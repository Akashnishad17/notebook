import React, { useContext, useState } from 'react';
import AuthContext from '../context/auth/authContext';

const Login = () => {
    const authContext = useContext(AuthContext);
    const {login} = authContext;
    const [auth, setAuth] = useState({email: '', password: ''});

    const handleSubmit = (event) => {
        event.preventDefault();
        login(auth.email, auth.password);
    };

    const handleChange = (event) => {
        setAuth({...auth, [event.target.name]: event.target.value});
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
