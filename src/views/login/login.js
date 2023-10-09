import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/login-service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const checkInputs = () => {

        // Check if the user has entered both fields correctly
        if ("" === username) {
            toast.error("Username Required");
            return false
        }

        if ("" === password) {
            toast.error("Password Required");
            return false
        }

        return true
    }

    const onButtonClick = async () => {
        if (checkInputs()) {
            const res = await loginService.login(username, password);

            localStorage.setItem("userData", JSON.stringify(res));
            localStorage.setItem("token", JSON.stringify(res.token))

            if (res !== undefined) {
                if (res.code === 1) {
                    navigate("/users");
                } else {
                    toast.error("Incorrect Credentials");
                }
            }
        }
    }

    return (
        <div className="main-container">
            <ToastContainer limit={2}></ToastContainer>

            <div className="login-container">
                <div className="login-components">

                    <div className="login-header">
                        <h2>CRUD Login</h2>
                    </div>

                    <div className="login-cred">
                        <input type="text" value={username} placeholder="Username"
                            onChange={ev => setUsername(ev.target.value)} className="inputBox" />

                        <input type="password" value={password} placeholder="Password"
                            onChange={ev => setPassword(ev.target.value)} className="inputBox" />

                        <input type="button" className="blue" onClick={onButtonClick} value={"Log in"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin