import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/HomePage';
import Intro from './pages/IntroPage';
import Success from './pages/SuccessPage';
import LoaderPage from './pages/LoaderPage';
import apiService from './services/apiService';

interface TInfo {
  connected: boolean;
}

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isConnected, setConnected] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const fetchInfo = async () => {
      const data = await apiService.info<TInfo>();
      setLoading(false);
      setConnected(!!data?.connected);
    };
    fetchInfo();
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      {!isLoading ? (
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/intro" element={<Intro />} ></Route>
          <Route path="/success" element={<Success />} ></Route>
        </Routes>
      ) : (
        <LoaderPage />
      )}
    </AnimatePresence>
  );
}

export default App;
