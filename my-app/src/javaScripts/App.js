import '../css/App.css';
import CoinsPanal from './CoinsPanal.js';
import MoneyCount from './MoneyCount.js';

function App() {
  return (
    <div className="App">
      <Header />
      <MoneyCount count={0} />
      <CoinsPanal />
    </div>
  );
}

function Header() {
  return (
    <header className="App-header">
      Black Jack
    </header>
  );
}

export default App;
