import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./pages/auth/login";
import Home from "./pages/Home/index";
import About from "./pages/about/index";
import ToDo from "./pages/todo";

function App() {
  return (
    <Router>
      {/* <div>
        {/* <NavBar /> */}
        {/* <Login/> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} > 
            <Route path="about" element={<About />} />
            <Route path="todo" element={<ToDo />} />
          </Route>
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
