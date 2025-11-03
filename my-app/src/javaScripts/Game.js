import MoneyCount from './MoneyCount.js';
import { Header } from './App.js';
import Card from './Card.js';
import '../css/Game.css';
import { gameCards, suits } from './GameCards.js';
import { useState, useEffect } from 'react';

function Game({ playerMoeny }) {
    const [dealerCards, setDealerCards] = useState([randomCard(false), randomCard(true)]);
    const [playerCards, setPlayerCards] = useState([randomCard(false), randomCard(false)]);
    const [result, setResult] = useState(null);

    let dealerSum = sumCards(dealerCards);
    let playerSum = sumCards(playerCards);

    function handleHit() {
        setPlayerCards([...playerCards, randomCard(false)]);
    }

    function handleStand() {
        let dealerCardsTmp = [...dealerCards];
        dealerCardsTmp[1].flipped = false;

        if (playerSum === 21 && playerCards.length === 2) {
            setResult("win");
            return;
        }

        if (dealerSum === 21 && dealerCards.length === 2) {
            setDealerCards(dealerCardsTmp);
            setResult("lose");
            return;
        }

        while (dealerSum < 17) {
            dealerCardsTmp = [...dealerCardsTmp, randomCard(false)];
            dealerSum = sumCards(dealerCardsTmp);
        }
        
        setDealerCards(dealerCardsTmp);

        console.log(dealerSum);

        if (playerSum > 21 || (dealerSum > playerSum && dealerSum < 22)) {
            setResult("lose");
        } else if (playerSum === dealerSum) {
            setResult("push");
        } else {
            setResult("win");
        }

    }

    function handleDouble() {
        const newCard = randomCard(false);
        playerSum = sumCards([...playerCards, newCard]);
        setPlayerCards(pc => {
            
            return [...pc, newCard];
        });
        console.log(playerSum);
        handleStand();
    } 

    return (
    <>
        {result && <WinLoseScreen result={result} onClose={() => setResult(null)} />}
        <Header />
        <MoneyCount playerMoeny={playerMoeny} />
        <Dealer cards={dealerCards} />
        <PlayerOptions handleHit={handleHit} playerSum={playerSum} handleStand={handleStand} handleDouble={handleDouble}/>
        <Player cards={playerCards}/>
    </>);
}

function sumCards(cardsArray) {
    let sum = 0;
    let isAce = 0;
    for (let i = 0; i < cardsArray.length; i++) {
        if (cardsArray[i].rank === "A") {
            isAce++;
        } else {
            sum += cardsArray[i].value;
        }
    }

    for (let i = 0; i < isAce; i++) {
        sum += 11;
        if (sum > 21) {
            sum -= 10;
        }
    }

    return sum;
}

function randomCard(flipped) {
    const randomIndex = Math.floor(Math.random() * gameCards.length);
    const rank = gameCards[randomIndex].key;
    const value = gameCards[randomIndex].value;
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return {key: Math.floor(Math.random() * 1000000), rank: rank, value: value, suit: suit, flipped: flipped};
}

function Dealer({ cards }) {
    return (
        <>
            <ul className="dealer-cards"> 
                {cards.map(card => <li key={card.key}><Card rank={card.rank} suit={card.suit} flipped={card.flipped}/></li>)}
            </ul>
        </>
    );
}

function PlayerOptions({ handleHit, playerSum, handleStand, handleDouble }) {
    let disabledHit = false;
    if (playerSum > 21) disabledHit = true;

    return (
        <div className="btns-options">
            <button className="btn-hit" disabled={disabledHit} onClick={handleHit}>hit</button>
            <button className="btn-stand" disabled={false} onClick={handleStand}>stand</button>
            <button className="btn-double" disabled={false} onClick={handleDouble}>double</button>
            <button className="btn-split" disabled={true}>split</button>
        </div>
    );

}

function Player({ cards }) {
    return (
        <>
            <ul className="player-cards">
                {cards.map(card => <li key={card.key}><Card rank={card.rank} suit={card.suit} flipped={card.flipped}/></li>)}
            </ul>
        </>
    );
} 

function WinLoseScreen({ result, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // hides after 2 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const message =
    result === "win"
      ? "YOU WIN 🎉"
      : result === "lose"
      ? "YOU LOSE 💀"
      : "PUSH 🤝";

  return (
    <div className={`winlose-screen ${result}`}>
      <h1 className="winlose-text">{message}</h1>
    </div>
  );
}

export default Game;