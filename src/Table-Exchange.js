import React, { useEffect, useState } from 'react';
import './Table-Exchange.css';
import CurrTable from './Currency-Table';

const LatestRates = 'https://alt-exchange-rate.herokuapp.com/latest'

function TEApp() {
  return (
    <div className="App">
      <h1 className="title">Table Exchange</h1>
      <CurrTable />
    </div>
  );
}

export default TEApp;
