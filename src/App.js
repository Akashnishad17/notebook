import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import AuthState from './context/auth/AuthState';
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
	const [alert, setAlert] = useState(null);

	const showAlert = (type, message) => {
		setAlert({type: type, message: message});
		setTimeout(() => setAlert(null), 2000);
	};

	return (
		<>
			<Router>
				<AuthState showAlert={showAlert}>
					<NoteState showAlert={showAlert}>
						<Navbar />
						<Alert alert={alert} />
						<div className="container my-3">
							<Routes>
								<Route exact path='/' element={<Home />} />
								<Route exact path='/about' element={<About />} />
								<Route exact path='/login' element={<Login />} />
								<Route exact path='/signup' element={<Signup />} />
							</Routes>
						</div>
					</NoteState>
				</AuthState>
			</Router>
		</>
	);
}

export default App;
