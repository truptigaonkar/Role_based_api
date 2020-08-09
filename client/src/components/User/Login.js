import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { token$, updateToken } from '../../store'

const Login = () => {
    const [token] = useState(token$.value)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [toDashboard, setToDashboard] = useState(false)

    const handleLogin = (e) =>{
        e.preventDefault()
        let source = axios.CancelToken.source()
        axios.post('http://localhost:5000/api/users/login-user', { username, password }, { headers: { Authorization: "Bearer " + token }}, {cancelToken: source.token})
        .then((res) => {
            console.log(res);
            updateToken(res.data.token); // Token
            window.localStorage.setItem("token", res.data.token)  // Saving token in localStorage
            setToDashboard(true)
            setUsername([])
            setPassword([])
        })
        .catch((err) => {
            if (!axios.isCancel(err)) {
                console.log(err.response.data.message)
            //setError(err.message);
            setError(err.response.data.message)
            }
        });
        return () =>{source.cancel()}
    }

    return (
        <div>
            <h4>Login</h4>
            {toDashboard ? <Redirect to="/dashboard" /> : null}
            <div style={{color:'red'}}>{error && <div><b>{error}</b></div>}</div>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button>LOGIN</button>
            </form>
        </div>
    )
}

export default Login;
