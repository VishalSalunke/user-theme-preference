import { Navigate } from "react-router-dom";

import Users from "../components/Users";

const Home = ({ user }) => {
  return <>{user ? <Users /> : <Navigate to="/login" />}</>;
};

export default Home;
