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
  username: string;
}

function App() {
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isConnected, setConnected] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const fetchInfo = async () => {
      const data = await apiService.info<TInfo>();
      setLoading(false);
      setConnected(!!data?.connected);
      setUsername(data?.username as string);
    };
    fetchInfo();
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      {!isLoading ? (
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home isConnected={isConnected} />} ></Route>
          <Route path="/intro" element={
            <Intro
              username={username}
              isConnected={isConnected}
              setUsername={setUsername}
              setConnection={setConnected}
            />}>
          </Route>
          <Route path="/success" element={<Success isConnected={isConnected} />} ></Route>
        </Routes>
      ) : (
        <LoaderPage />
      )}
    </AnimatePresence>
  );
}

export default App;
