import '../css/App.css';
import CoinsPanal from './CoinsPanal.js';
import MoneyCount from './MoneyCount.js';
import { StartButton } from './CoinsPanal.js';
import { useState } from 'react';
import Game from './Game.js';

function App() {
  const [startGame, setStartGame] = useState(false);
  
  function onStart() {
    setStartGame(true);
  }

  return (
    <div className="App">
      {!startGame ? <>
        <Header />
        <MoneyCount count={1000} />
        <CoinsPanal/>
        <div className="button-continer">
        <StartButton disabled={false} onStart={onStart}/>
        </div>
      </> : <Game />}
    </div>
  );
}

export function Header() {
  return (
    <header className="App-header">
      Black Jack
    </header>
  );
}

export default App;
