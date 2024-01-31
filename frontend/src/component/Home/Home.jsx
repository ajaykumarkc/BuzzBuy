import React, { useEffect } from 'react'
import Product from "./ProductCard.jsx"
import MetaData from '../layout/MetaData.jsx';
import "./Home.css";
import { getProduct } from '../../actions/productAction.js';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../layout/Loader/Loader.jsx';
import { useAlert } from 'react-alert';



const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const {loading,error,products} = useSelector((state) => state.products);
 
  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  },[dispatch,error,alert]);

  return (
    <>
    {loading ? <Loader />:  <>
    <MetaData title={"BuzzBuy"} />
    <div className="banner">
      <p>Welcome To BuzzBuy</p>
      <h1>Find Amazing Products Below</h1>
      <a href="#container">
        <button>Scroll</button>
      </a>
    </div>
    <h2 className="homeHeading">Featured Products</h2>
    <div className="container" id="container">
    {products &&
       products.map((product) => (
       <Product key={product._id} product={product} />
      ))}
    </div>
    </>}
    </>
   
  )
}

export default Home