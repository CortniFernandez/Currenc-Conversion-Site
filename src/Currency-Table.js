import React from 'react';

const CurrTable = (props) => {
  const { base, rates } = props;
  if (!rates) {
    return null;
  }

  return (
    <div className="te-container">
      <div className="row">
        <div className="col-lg-4 offset-lg-4 col-md-8 offset-md-2">
          <table className="table">
            <tbody>
              {rates.map(currency =>
                <tr key={currency.acronym}>
                  <td align="right">{currency.rate}</td>
                  <td>{currency.acronym}</td>
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