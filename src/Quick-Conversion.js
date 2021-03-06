import React, { useEffect, useState } from 'react';
import './Quick-Conversion.css';
import QCRow from './QCRow';

const LatestRates = 'https://alt-exchange-rate.herokuapp.com/latest'

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
      </div>
  </div>
  );
}

export default QCApp;
