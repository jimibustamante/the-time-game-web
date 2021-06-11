import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FontStyles, AppWrapper } from './styles'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { GameContextProvider } from './contexts/game-context'

import Game from './components/Game';
import Themes from './components/Themes'
import Home from './components/Home'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper>
      <FontStyles />
        <Router>
          <GameContextProvider>
            <Switch>
              <Route path="/:theme_id/play">
                <Game />
              </Route>
              <Route path="/themes">
                <Themes />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </GameContextProvider>
        </Router>
    </AppWrapper>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
