import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { token$, updateToken } from '../../store'
import { Redirect } from 'react-router-dom';
import Logout from './Logout';

const Dashboard = () => {
    const [toLogin, setToLogin] = useState(false)
    const [error, setError] = useState(false)
    const [profileData, setProfileData] = useState('')
    const [token] = useState(token$.value)

    // Protected route
    useEffect(() => {
        let source = axios.CancelToken.source()
        axios.get('http://localhost:5000/api/users/profile/', 
        {   cancelToken: source.token,
            // headers: { Authorization: "Bearer " + token } //Used for Authorization with bearer token
            headers: { 'Authorization': token }
        })
        .then((res) => {
          console.log(res.data);
          setProfileData(res.data)
          setToLogin(false)
        })
        .catch((err) => {
            if (!axios.isCancel(err)) {
                setToLogin(true)
                setError(err.message);
                //setError(err.response.data.message)
            }
            updateToken(null);
        });
        return () =>{source.cancel() }
    }, [token]);

    return (
        <div>
            {toLogin ? <Redirect to="/login" /> : null}
            <h4>Dashboard</h4>
            <Logout />
            <div style={{color:'red'}}>{error && <div><b>{error}</b></div>}</div>
            <p><b>Id: </b>{profileData._id}</p>
            <p><b>Username: </b>{profileData.username}</p>
            <p><b>Name: </b>{profileData.name}</p>
            <p><b>Email: </b>{profileData.email}</p>
            <p><b>Created at: </b>{profileData.createdAt}</p>
            <p><b>Updated at: </b>{profileData.updatedAt}</p>
        </div>
    )
}

export default Dashboard;
