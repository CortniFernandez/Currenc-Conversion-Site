import React from 'react';
import './QCRow.css';

function QCRow() {
  return (
    <div className="qc-row">
      <input type="number" className="qc-input" />
      <select className="qc-select">
        <option value="hi">Hi</option>
      </select>
    </div>
  );
}

export default QCRow;