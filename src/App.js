import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Config from './pages/Config';
import NotFound from './pages/NotFound';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/feedback" element={ <Feedback /> } />
        <Route path="/ranking" element={ <Ranking /> } />
        <Route path="/config" element={ <Config /> } />
        <Route path="/game" element={ <Game /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
}
