import React from 'react';

const CurrTable = (props) => {
  const { rates } = props;
  if (!rates) {
    return null;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
          <table className="table">
            <tbody>
              {rates.map(currency =>
                <tr key={currency.acronym}>
                  <td align="right">{currency.rate.toFixed(6)}</td>
                  <td>{currency.name} (<b>{currency.symbol}</b> {currency.acronym})</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CurrTable;