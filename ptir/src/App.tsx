import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './routes/welcome-page/welcome.tsx';
import Register from './routes/register-page/register.tsx';
import Login from './routes/login-page/login.tsx';
import Profile from './routes/profile-page/profile.tsx'
import Home from './routes/home-page/home.tsx';
import Search from './routes/search-page/search';
import Product from './routes/product-page/product.tsx';
import AuthenticatedRoute from './components/Authenticated-Route/Authenticated-Route.tsx';
import UnauthenticatedRoute from './components/Unauthenticated-Route/Unauthenticated-Route.tsx';
//import NotFound from './routes/notFound-page/notFound.tsx';
import CreateProduct from './routes/createProduct-page/createProduct.tsx';
import CompleteRegister from './routes/completeRegister-page/completeRegister.tsx';
import Admin from './routes/admin-page/admin.tsx';
//import Service from './routes/service-page/service.tsx';
import Payment from './routes/payment-page/payment.tsx';
//import SuccessfulPayment from './routes/successfulPayment-page/successfulpayment.tsx';

class App extends React.Component<{}>{
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/createProduct' element={<CreateProduct/>}/>
          <Route path='/completeRegister' element={<CompleteRegister/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/payment' element={<Payment/>}/>
          
        </Routes>
      </Router>
    );
  }
}

/*          <UnauthenticatedRoute path='/register' exact>
            <Register/>
          </UnauthenticatedRoute>
          <UnauthenticatedRoute path='/login' exact>
            <Login/>
          </UnauthenticatedRoute>
          <AuthenticatedRoute path='/profile' exact>
            <Profile/>
          </AuthenticatedRoute>
*/
export default App;