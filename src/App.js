import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Config from './pages/Config';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/config" component={ Config } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </div>
  );
}
