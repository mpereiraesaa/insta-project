import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Intro from './pages/IntroPage';
import Success from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/intro" element={<Intro />} ></Route>
        <Route path="/success" element={<Success />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
