import { useNavigate } from "react-router-dom";

import Users from "../components/Users";

const Home = ({ user }) => {
  const navigate = useNavigate();
  if (!user) navigate("/login");
  return <>{user ? <Users /> : null}</>;
};

export default Home;
