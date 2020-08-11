import React, {useState} from 'react'
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const handleRegister = (e) =>{
        e.preventDefault()
        let source = axios.CancelToken.source()
        axios.post('http://localhost:5000/api/users/register-user', { username, email, name, password }, {cancelToken: source.token})
        .then((res) => {
            console.log(res);
            setMessage(res.data.message)
            setUsername([])
            setEmail([])
            setName([])
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
            <h4>USER Register</h4>
            <div style={{color:'green'}}>{message && <div><b>{message}</b></div>}</div>
            <div style={{color:'red'}}>{error && <div><b>{error}</b></div>}</div>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button>REGISTER</button>
            </form>
        </div>
    )
}

export default Register;
