import React from 'react';
import './QCRow.css';


function QCRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props
  return (
    <div className="qc-row">
      <input type="number" className="qc-input" value={amount} onChange={onChangeAmount}/>
      <select className="qc-select" value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default QCRow;