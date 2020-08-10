import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import './App.css';
import Home from '../Home';
import Login from '../User/Login';
import Register from '../User/Register';
import Dashboard from '../User/Dashboard';
import { token$, updateToken } from '../../store'

function App() {
  const [toLogin] = useState(false)

  const ProtectedRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={(props) => {
      return window.localStorage.getItem('token') ? < Component {...props}/> : <Redirect to="/login"/>
    }} />
  }

  return (
    <div className="App">
      {toLogin ? <Redirect to="/login" /> : null}
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li> 
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        <Route exact path="/" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        {/* <Route path="/dashboard" component={Dashboard}/> */}
        <ProtectedRoute path="/dashboard" component={Dashboard}/>
      </Router>
    </div>
  );
}

export default App;
