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

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GameContextProvider>
      <AppWrapper>
        <FontStyles />
          <Router>
            <Switch>
              <Route path="/">
                <App />
              </Route>
            </Switch>
          </Router>
      </AppWrapper>
    </GameContextProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
