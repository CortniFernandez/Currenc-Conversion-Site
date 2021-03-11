import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import './Quick-Conversion.css';
import QCRow from './QCRow';

const LatestRates = 'https://api.exchangeratesapi.io/latest'

function QCApp() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(LatestRates)
      .then(response => response.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${LatestRates}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(response => response.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
        .then(getHistoricalRates(fromCurrency, toCurrency))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  function handleSwap(e) {
    e.preventDefault()
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  function getHistoricalRates (base, quote) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${quote}`)
      .then(response => response.json())
      .then(data => {
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }

  function buildChart (labels, data, label) {
    const context = document.getElementById('chart').getContext('2d');
    new Chart(context, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
  }

  return (
    <div className="App">
      <h1 className="title">Quick Conversion</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4 col-md-8 offset-md-2">
            <QCRow 
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={e => setFromCurrency(e.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 offset-lg-4 col-md-8 offset-md-2">
            <div className="mid-box">
              <div className="equals">=</div>
              <div className="swap-button">
                <p className="m-0" onClick={handleSwap}>&#8595;&#8593;</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 offset-lg-4 col-md-8 offset-md-2">
            <QCRow 
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={e => setToCurrency(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
            />
          </div>
        </div>
        <h5 className="text-center pt-5 pb-2 chart-title">Exchange Rate Over Time</h5>
        <canvas id="chart" />
      </div>
      
  </div>
  );
}

export default QCApp;
