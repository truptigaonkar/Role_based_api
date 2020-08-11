import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import './App.css';
import Home from '../User/Home';
import Login from '../User/Login';
import Register from '../User/Register';
import Dashboard from '../User/Dashboard';

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
            <li>{!window.localStorage.getItem('token') ? <Link to="/register">Register</Link> : null}</li>
            <li>{!window.localStorage.getItem('token') ? <Link to="/login">Login</Link> : null}</li>
          </ul>
        </nav>
        <Route exact path="/" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <ProtectedRoute path="/dashboard" component={Dashboard}/>
      </Router>
    </div>
  );
}

export default App;
