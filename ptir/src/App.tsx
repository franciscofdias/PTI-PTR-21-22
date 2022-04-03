import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './routes/welcome-page/welcome'
import Register from './routes/register-page/register'
import Login from './routes/login-page/login'

const App: React.FC<{}> = ({}) => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={Welcome}/>
        <Route path='/register' element={Register}/>
        <Route path='/login' element={Login}/>
      </Routes>
    </Router>
  );
}

export default App;