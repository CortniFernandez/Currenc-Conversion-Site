import React from 'react';

function CurrTable() {
  return (
    <div className="te-container">
      <div className="row">
        <div className="col-lg-4 offset-lg-4 col-md-8 offset-md-2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">1 <span><select>(curr)</select></span> =</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td align="right">rate</td>
                  <td>currency</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CurrTable;