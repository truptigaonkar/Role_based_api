import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { token$, updateToken } from '../../store'
import Logout from '../Logout';
import Userinfo from './Userinfo';

const Dashboard = () => {
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
        })
        .catch((err) => {
            if (!axios.isCancel(err)) {
                setError(err.message);
                //setError(err.response.data.message)
            }
            updateToken(null);
        });
        return () =>{source.cancel() }
    }, [token]);

    return (
        <>
            Welcome, {profileData.name}! <Logout />
            <h4>Dashboard</h4>
            <div style={{color:'red'}}>{error && <div><b>{error}</b></div>}</div>
                <Userinfo profileData={profileData}/>
        </>
    )
}

export default Dashboard;
