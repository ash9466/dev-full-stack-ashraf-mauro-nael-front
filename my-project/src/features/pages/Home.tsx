import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ProductList from '../ProductList';
import Header from '../../components/Header';

const Home = () => {

  return (
    <><Header />
    <ProductList></ProductList>
    </>
  );
};

export default Home;