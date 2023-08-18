import React from 'react'
import Home from './Home'
import {Route, Routes, useLocation} from 'react-router-dom';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';

function Pages() {
  const location = useLocation();
  return (
        <Routes Location={location} key={location.pathname}>
            <Route path="/" element={<Home/>}/>
            <Route path="/cuisine/:type" element={<Cuisine/>}/>
            <Route path="/cuisines/:search" element={<Searched/>}/>
            <Route path="/recipe/:name" element={<Recipe/>}/>
        </Routes>
  )
}

export default Pages
