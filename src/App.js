import React from "react";
import Movies from "./components/Movies";
import "./App.css";
import Logo from "./images/star-wars-logo.jpg";
import FilmDetails from "./components/FilmDetails";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className='container'>
      <header>
        <img src={Logo} alt='' />
      </header>

    <Routes>
      <Route path='/' element={<Movies />} />
      <Route path='/films' element={<FilmDetails />} />
    </Routes>
    </div>
  </Router>
  );
};

export default App;
