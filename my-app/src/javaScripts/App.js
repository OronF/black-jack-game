import '../css/App.css';
import CoinsPanal from './CoinsPanal.js';
import MoneyCount from './MoneyCount.js';
import { StartButton } from './CoinsPanal.js';
import { useState } from 'react';
import Game from './Game.js';

function App({ playerMoney }) {
  const [startGame, setStartGame] = useState(false);
  const [money, setMoney] = useState(playerMoney);
  const [moneySelected, setMoneySelected] = useState([true, 0]);

  let needMoney = false;
  if (money === 0) {
    needMoney = true;
  }

  function onClose() {
    setMoney(100);
  }
  
  function onStart() {
    setStartGame(true);
  }

  function handleSelectedMoneyValue(value) {
    if (money < moneySelected[1] + value) {
      return;
    }
    setMoneySelected([false, moneySelected[1] + value]);
  }

  function handleClear() {
    setMoneySelected([true, 0]);
  }

  function handleAllIn() {
    setMoneySelected([false, money]);
  }

  return (
    <div className="App">
      {!startGame ? <>
        <Header />
        <MoneyCount playerMoeny={money} needMoney={needMoney} onClose={onClose} />
        <CoinsPanal selectedMoney={moneySelected[1]} coinsOnClick={handleSelectedMoneyValue} handleClear={handleClear} handleAllIn={handleAllIn}/>
        <div className="button-continer">
        <StartButton disabled={moneySelected[0]} onStart={onStart}/>
        </div>
      </> : <Game playerMoeny={money} moneySelected={moneySelected[1]} />}
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
