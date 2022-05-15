import React, {useContext} from "react"
import Login from "./components/pages/login/Login";
import Register from './components/pages/register/Register'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {  Context } from "./Contexts/ContextProvider";
import Write from "./components/pages/write/Write";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import SinglePost from "./components/singlepost/SinglePost";
import Main from "./components/pages/main/Main";



function App() {
  const {user} = useContext(Context);

  return (
<> 
<Router>
            <Routes>
            
            <Route exact path="/allPost" element={user?<Home/>:<Login/> }></Route>
              <Route  path="/register" element={<Register/>}></Route>
              <Route path="/about" element={!user?<Register/>:<About/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/write" element={user?<Write/>:<Login/>}></Route>
              <Route path="/singlePost/:PostId" element={<SinglePost/>}></Route>
              <Route path="/" element={user?<Main/>:<Login/>}></Route>
            </Routes>
</Router> 
</>
  );
}

export default App;