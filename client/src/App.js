import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./contexts/authContext";
import Home from "./pages/home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const context = useContext(AuthContext);

  return (
    <div
      className="App"
      id={context?.user?.theme ? context.user.theme : "light"}
    >
      <Navbar user={context.user} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home user={context.user} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
