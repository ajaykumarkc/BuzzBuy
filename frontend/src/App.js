
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.jsx"
import Home from './component/Home/Home.jsx'
import Products from './component/Product/Products.jsx'
import ProductDetails from './component/Product/ProductDetails.jsx'
import Search from './component/Product/Search.jsx'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import webFont from "webfontloader";
import { useEffect, useState } from 'react';
import LoginSignUp from './component/User/LoginSignUp.jsx';
import store from './store.js'
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import { useSelector } from "react-redux";
import Profile from './component/User/Profile.jsx'
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from './component/User/UpdatePassword.jsx'
import Cart from "./component/Cart/Cart.jsx";
import Shipping from './component/Cart/Shipping.jsx'
import ConfirmOrder from './component/Cart/ConfirmOrder.jsx'
import Payment from "./component/Cart/Payment.jsx";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrders from "./component/Order/MyOrders.jsx";
import OrderDetails from "./component/Order/OrderDetails.jsx";
import Dashboard from "./component/Admin/Dashboard.jsx";
import ProductList from "./component/Admin/ProductList.jsx";
import UpdateProduct from "./component/Admin/UpdateProduct.jsx";
import OrderList from "./component/Admin/OrderList.jsx";
import ProcessOrder from "./component/Admin/ProcessOrder.jsx";
import UsersList from "./component/Admin/UsersList.jsx";
import UpdateUser from "./component/Admin/UpdateUser.jsx";
import ProductReviews from "./component/Admin/ProductReviews.jsx";
import Contact from "./component/layout/Contact/Contact.jsx";
import About from "./component/layout/About/About.jsx";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import axios from 'axios';
import NewProduct from './component/Admin/NewProduct.jsx';

function App() {
  const { isAuthenticated, user} = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google:{
        families:["Roberto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])
  
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:id' element={<ProductDetails />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/products/:keyword' element={<Products />}/>
        <Route path='/search' element={<Search />}/>
        {isAuthenticated && <Route path = '/account' element={<Profile />} />}
        {isAuthenticated && <Route path = '/me/update' element={<UpdateProfile />} />}
        {isAuthenticated && <Route path = '/password/update' element={<UpdatePassword />} />}
        {isAuthenticated && <Route path = '/login/shipping' element={<Shipping />} />}
        {isAuthenticated && <Route path = '/order/confirm' element={<ConfirmOrder />} />}
        
        {stripeApiKey&&isAuthenticated && (
        
        <Route path = '/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>} />
        )}

{isAuthenticated && <Route path = '/success' element={<OrderSuccess />} />}
{isAuthenticated && <Route path = '/orders' element={<MyOrders />} />}
{isAuthenticated && <Route path = '/order/:id' element={<OrderDetails />} />}
{isAuthenticated && user.role==="admin"&& <Route path = '/admin/dashboard' element={<Dashboard />} />}
{isAuthenticated && user.role==="admin"&& <Route path = '/admin/products' element={<ProductList />} />}
{isAuthenticated && user.role==="admin"&& <Route path = '/admin/product' element={<NewProduct />} />}
{isAuthenticated && user.role==="admin"&& <Route path = '/admin/product/:id' element={<UpdateProduct />} />}
{isAuthenticated && user.role==="admin"&& <Route path = '/admin/orders' element={<OrderList />} />} 
{isAuthenticated && user.role==="admin"&& <Route path = '/admin/order/:id' element={<ProcessOrder />} />} 
{isAuthenticated && user.role==="admin"&& <Route path = '/admin/users' element={<UsersList />} />} 
{isAuthenticated && user.role==="admin"&& <Route path = '/admin/user/:id' element={<UpdateUser />} />} 
{isAuthenticated && user.role==="admin"&& <Route path = '/admin/reviews' element={<ProductReviews />} />}      
        <Route path='/login' element={<LoginSignUp />}/>
        <Route  path="/cart" element={<Cart/>} />
      </Routes>
      <Footer />
      </Router>
  );
}

export default App;
