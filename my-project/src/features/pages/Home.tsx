import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import HopeList from '../HopeList';
import Header from '../../components/Header';
import { useUser } from '@/auth/services/UserContext';

const Home = () => {

  // const { user, setUser } = useUser();
  
  // if(!user){
  //   return(
  //     <><Header /></>
  //   );
  // }

  return (
    <><Header />
    <HopeList></HopeList>
    </>
  );
};

export default Home;