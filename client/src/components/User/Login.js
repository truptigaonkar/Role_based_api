import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [toDashboard, setToDashboard] = useState(false)

    const handleLogin = (e) =>{
        e.preventDefault()
        let source = axios.CancelToken.source()
        axios.post('http://localhost:5000/api/users/login-user', { username, password }, {cancelToken: source.token})
        .then((res) => {
            console.log(res);
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
