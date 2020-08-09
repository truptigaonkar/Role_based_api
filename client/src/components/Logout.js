import React, {useState} from 'react'
import { updateToken } from '../store'
import { Redirect } from 'react-router-dom';

const Logout = () => {

    const [toLogin, setToLogin] = useState(false)

    const handleLogout = (e) =>{
        e.preventDefault();
        updateToken(null);
        setToLogin(true)
    }

    return (
        <div>
            {toLogin ? <Redirect to="/login" /> : null}
            <button onClick={handleLogout}>LOGOUT dashboard</button>
        </div>
    )
}

export default Logout;