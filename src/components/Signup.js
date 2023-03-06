import React, { useContext, useState } from 'react';
import AuthContext from '../context/auth/authContext';

const Signup = () => {
    const authContext = useContext(AuthContext);
    const {signup} = authContext;
    const [user, setUser] = useState({name: '', email: '', password: ''});

    const handleSubmit = (event) => {
        event.preventDefault();
        signup(user.name, user.email, user.password);
    };

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    return (
        <div className="container">
            <h2>Notebook - Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" minLength={3} required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={handleChange} />
                </div>
                <button disabled={user.name.length < 3 || user.password.length < 5} type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
