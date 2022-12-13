import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Register from './components/Auth/Register';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel/AdminPanel';
import AlertMessage from './components/AlertMessage';
import AlertContext from './context/AlertContext';
import Products from './components/Products/Products';
import SingleProduct from './components/Products/SingleProduct';
import EditProduct from './components/AdminPanel/EditProduct';
import Cart from './components/Cart/Cart';
import Contacts from './components/static/Contacts';
import NotPage from './components/static/NotPage';
import Home from './components/HomePage/Home';
import Layout from './components/Layout';
import ProductsNew from './components/Products/ProductsNew';
import ProductsSale from './components/Products/ProductsSale';

function App() {
  const [alertMessage, setAlertMessage] = useState({text: '', variant: ''});
  const [point, setPoint] = useState('');
  const [sale, setSale] = useState(true);
  const [novelty, setNovelty] = useState(true);

  return <>
  <AlertContext.Provider value={{setAlertMessage, setPoint, setNovelty, setSale}}>
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NotPage />} />
              <Route path="products" element={<Products point = {point} />} />
              <Route path="products/new" element={<ProductsNew novelty={novelty} />} />
              <Route path="products/sale" element={<ProductsSale sale={sale} />} />
              <Route path="products/:productId" element={<SingleProduct />} />
              <Route path="products/:productId/edit-product" element={<EditProduct />} />
              <Route path="admin" element={<AdminPanel />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="contacts" element={<Contacts />} />
            </Route>
          </Routes>
      <AlertMessage message = {alertMessage}/>
    </BrowserRouter>
  </AlertContext.Provider>
  </>
}

export default App;
