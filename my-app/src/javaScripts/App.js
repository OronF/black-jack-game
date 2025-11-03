import '../css/App.css';
import CoinsPanal from './CoinsPanal.js';
import MoneyCount from './MoneyCount.js';
import { StartButton } from './CoinsPanal.js';
import { useState } from 'react';
import Game from './Game.js';

function App({ playerMoney }) {
  const [startGame, setStartGame] = useState(false);
  const [needMoney, setNeedMoney] = useState(false);

  let playerMoneyTmp = playerMoney;

  function onClose() {
    playerMoneyTmp = 100;
    setNeedMoney(true);
  }
  
  function onStart() {
    setStartGame(true);
  }

  return (
    <div className="App">
      {!startGame ? <>
        <Header />
        <MoneyCount count={playerMoneyTmp} needMoney={needMoney} onClose={onClose} />
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
