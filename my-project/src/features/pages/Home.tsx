import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import HopeList from '../HopeList';
import Header from '../../components/Header';
import { useUser } from '@/auth/services/UserContext';
import { HopeTab } from '../HopeTab';

const Home = () => {

  // const { user, setUser } = useUser();
  
  // if(!user){
  //   return(
  //     <><Header /></>
  //   );
  // }

  return (
    <><Header />
    <HopeTab></HopeTab>
    </>
  );
};

export default Home;