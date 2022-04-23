import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './routes/welcome-page/welcome.tsx';
import Register from './routes/register-page/register.tsx';
import Login from './routes/login-page/login.tsx';
import Profile from './routes/profile-page/profile.tsx'
//import Home from './routes/home-page/home';
//import Search from './routes/search-page/search';
import Product from './routes/product-page/product.tsx';
import AuthenticatedRoute from './components/Authenticated-Route/Authenticated-Route.tsx';
import UnauthenticatedRoute from './components/Unauthenticated-Route/Unauthenticated-Route.tsx';
//import NotFound from './routes/notFound-page/notFound';
import CreateProduct from './routes/createProduct-page/createProduct';
//import Admin from './routes/admin-page/admin'

class App extends React.Component<{}>{
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/createProduct' element={<CreateProduct/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <UnauthenticatedRoute path='/register' exact>
            <Register/>
          </UnauthenticatedRoute>
          <UnauthenticatedRoute path='/login' exact>
            <Login/>
          </UnauthenticatedRoute>
          <AuthenticatedRoute path='/profile' exact>
            <Profile/>
          </AuthenticatedRoute>
        </Routes>
      </Router>
    );
  }
}


export default App;