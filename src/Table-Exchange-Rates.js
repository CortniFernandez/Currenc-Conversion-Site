import React from 'react';
import './Table-Exchange-Rates.css';
import currencies from './currencies';
import CurrTable from './Currency-Table';

class TEApp extends React.Component {
  constructor () {
    super();  
    this.state = {
      base: 'USD',
      rates: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.getRatesData(this.state.base);
  }

  changeBase = (e) => {
    this.setState({ base: e.target.value });
    this.getRatesData(e.target.value);
  }
  
  getRatesData = (base) => {
    this.setState({ loading: true });
    fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
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

        this.setState({ rates, loading: false });
      })
      .catch(error => console.error(error.message));
  }


  render () {
    const { base, rates, loading } = this.state;

    return (
      <div className="App">
        <h1 className="title">Table Exchange Rates</h1>
        <form className="pt-4 form-inline justify-content-center">
          <h3><b className="mr-2">1</b>
          <select value={base} onChange={this.changeBase} className="form-control form-control-lg te-select" disabled={loading}>
            {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
          </select><b className="ml-2">=</b></h3>
        </form>
        <CurrTable base={base} rates={rates} />
      </div>
    );
  }
}

export default TEApp;
