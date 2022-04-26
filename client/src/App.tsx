import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/HomePage';
import Intro from './pages/IntroPage';
import Success from './pages/SuccessPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/intro" element={<Intro />} ></Route>
        <Route path="/success" element={<Success />} ></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
