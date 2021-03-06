import React from 'react';
import './Table-Exchange.css';
import currencies from './currencies';
import CurrTable from './Currency-Table';

class TEApp extends React.Component {
  constructor () {
    super();  
    this.state = {
      base: 'USD',
      rates: null,
    }
  }

  componentDidMount() {
    this.getRatesData(this.state.base);
  }

  changeBase = (e) => {
    this.setState({ base: e.target.value });
  }
  
  getRatesData = (base) => {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const rates = Object.keys(data.rates)
        .filter(acronym => acronym !== base)
        .map(acronym => ({
          acronym,
          rate: data.rates[acronym],
          name: currencies[acronym].name,
          symbol: currencies[acronym].symbol,
        }))

        this.setState({ rates });
      })
      .catch(error => console.error(error.message));
  }


  render () {
    const { base, rates } = this.state;

    return (
      <div className="App">
        <h1 className="title">Table Exchange</h1>
        <form className="p-3 bg-light form-inline justify-content-center">
          <h3 className="mb-2"><b className="mr-2">1</b>
          <select value={base} onChange={this.changeBase} className="form-control form-control-lg mb-2">
            {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
          </select><b className="ml-2">=</b></h3>
        </form>
        <CurrTable base={base} rates={rates} />
      </div>
    );
  }
}

export default TEApp;
