import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Nav from './Nav';
import QCApp from './Quick-Conversion';
import TEApp from './Table-Exchange';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={QCApp} />
        <Route path="/quick-conversion" component={QCApp} />
        <Route path="/table-exchange" component={TEApp} />
      </Switch>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
