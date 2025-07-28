// import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Pages.jsx/home';
import Watch from './Pages.jsx/Watch';
import SignIn from './Pages.jsx/SignIn';
import Signup from "./Pages.jsx/Signup";
import Favourite from './Pages.jsx/Favourite';
import Search from './Pages.jsx/Search';



function App() {
  return (
    <Router>
     <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/signIn' element={<SignIn />}></Route>
        <Route path="/watch/:movieId" element={<Watch />}></Route>
        <Route path='/signup' element={<Signup />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path='/search' element={<Search />} />
     </Routes>
    </Router>
  );
}

export default App;
