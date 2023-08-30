import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

export default function LoginComponent() {

    const [username, setUsername] = useState("Yohannes")

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    const [password, setPassword] = useState('')

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    const [errorMessage, setErrorMessage] = useState(false)

    const navigate = useNavigate()
    
    const authContext = useAuth()

    function handleSubmit() {
        if (authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        }
        else {
            setErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            <h1>Enter Username and Password</h1>
            {errorMessage && <div className="errorMessage">Authenticated Failed</div>}
            {/*  creating username and password */}
            <div className="LoginForm">
                <div>
                    <label >UserName</label>
                    <input type="text" name="username"
                        value={username} onChange={handleUsernameChange} />
                </div>

                <div>
                    <label >Password</label>
                    <input type="password" name="password"
                        value={password} onChange={handlePasswordChange} />
                </div>

                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>

        </div>
    )
}