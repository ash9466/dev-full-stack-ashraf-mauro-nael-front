import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import HopeList from '../HopeList';
import Header from '../../components/Header';

const Home = () => {

  return (
    <><Header />
    <HopeList></HopeList>
    </>
  );
};

export default Home;