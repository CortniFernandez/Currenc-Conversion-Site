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
    <div>
      <div className="row">
        <div className="col-8">
          <input type="number" className="qc-input" value={amount} onChange={onChangeAmount}/>
          </div>
        <div className="col-4">
          <select className="qc-select p-2" value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default QCRow;