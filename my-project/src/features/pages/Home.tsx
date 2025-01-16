import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useUser } from "@/auth/services/UserContext";
import { HopeTab } from "../HopeTab";

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  //A décommenter à la fin

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/connexion");
  //   }
  // }, [user, navigate]);

  // if (!user) {
  //   return null;
  // }

  return (
    <>
      <Header />
      <HopeTab />
    </>
  );
};

export default Home;
