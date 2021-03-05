import './Quick-Conversion.css';
import QCRow from './QCRow';

function QCApp() {
  return (
    <div className="App">
      <h1 className="title">Quick Conversion</h1>
      <QCRow />
      <div className="qc-middle-box">
        <div className="equals">=</div>
        <div className="swap-button">
          <button>Swap</button>
        </div>
      </div>
      <QCRow />
    </div>
  );
}

export default QCApp;
