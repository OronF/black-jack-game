import MoneyCount from './MoneyCount.js';
import { Header } from './App.js';
import App from './App.js'
import Card from './Card.js';
import '../css/Game.css';
import { gameCards, suits } from './GameCards.js';
import { useState } from 'react';

function Game({ playerMoeny, moneySelected }) {
    const [dealer, setDealer] = useState(() => {
        const initial = [randomCard(false), randomCard(true)];
        return { dealerCards: initial, sum: sumCards(initial) };
    });
    const [player, setPlayer] = useState(() => {
        const initial = [randomCard(false), randomCard(false)];
        return { playerCards: initial, sum: sumCards(initial) };
    });
    const [result, setResult] = useState({gameState: null, money: moneySelected, endGame: false});

    function handleHit() {
        const playerCardsTmp = [...player.playerCards, randomCard(false)];
        const playerSumTmp = sumCards(playerCardsTmp);
        setPlayer({ playerCards: playerCardsTmp, sum: playerSumTmp });
        if (playerSumTmp > 21) {
            setTimeout(() => {
                setResult(res => {return { gameState: "lose", money: playerMoeny - res.money, endGame: true }});
            }, 1500);
        }
    }

    function handleStand() {
        setDealer(d => {
            const dealerCardsTmp = d.dealerCards.map(c => ({ ...c }));
            if (dealerCardsTmp[1]) dealerCardsTmp[1].flipped = false;
            return { dealerCards: dealerCardsTmp, sum: sumCards(dealerCardsTmp) };
        });

        let dealerCardsTmp = dealer.dealerCards.map(c => ({ ...c }));
        if (dealerCardsTmp[1]) dealerCardsTmp[1].flipped = false;
        let dealerSumTmp = sumCards(dealerCardsTmp);

        const steps = [];
        while (dealerSumTmp < 17) {
            dealerCardsTmp = [...dealerCardsTmp, randomCard(false)];
            dealerSumTmp = sumCards(dealerCardsTmp);
            steps.push({ cards: dealerCardsTmp.map(c => ({ ...c })), sum: dealerSumTmp });
        }

        steps.forEach((s, idx) => {
            setTimeout(() => {
                setDealer(() => ({ dealerCards: s.cards, sum: s.sum }));
            }, 1000 * (idx + 1));
        });

        const finalDelay = 1000 * (steps.length + 1);
        setTimeout(() => {
            const finalDealerSum = steps.length ? steps[steps.length - 1].sum : sumCards(dealerCardsTmp);
            const pSum = player.sum;
            let endUpMoney = result.money;

            let outcome;
            if (pSum > 21) { outcome = "lose"; endUpMoney = playerMoeny - endUpMoney; }
            else if (finalDealerSum > 21) { outcome = "win"; endUpMoney += playerMoeny; }
            else if (pSum > finalDealerSum) { outcome = "win"; endUpMoney += playerMoeny; }
            else if (pSum < finalDealerSum) { outcome = "lose"; endUpMoney = playerMoeny - endUpMoney; }
            else { outcome = "push"; endUpMoney = playerMoeny; }

            setResult({ gameState: outcome, money: endUpMoney, endGame: true });
        }, finalDelay + 300);
    }

    function handleDouble() {
        // implement later
        const playerCardsTmp = [...player.playerCards, randomCard(true)];
        const playerSumTmp = sumCards(playerCardsTmp);
        setPlayer({ playerCards: playerCardsTmp, sum: playerSumTmp });

        setTimeout(() => {
            setDealer(d => {
                const dealerCardsTmp = d.dealerCards.map(c => ({ ...c }));
                if (dealerCardsTmp[1]) dealerCardsTmp[1].flipped = false;
                return { dealerCards: dealerCardsTmp, sum: sumCards(dealerCardsTmp) };
            });

            let dealerCardsTmp = dealer.dealerCards.map(c => ({ ...c }));
            if (dealerCardsTmp[1]) dealerCardsTmp[1].flipped = false;
            let dealerSumTmp = sumCards(dealerCardsTmp);

            const steps = [];
            while (dealerSumTmp < 17) {
                dealerCardsTmp = [...dealerCardsTmp, randomCard(false)];
                dealerSumTmp = sumCards(dealerCardsTmp);
                steps.push({ cards: dealerCardsTmp.map(c => ({ ...c })), sum: dealerSumTmp });
            }

            steps.forEach((s, idx) => {
                setTimeout(() => {
                    setDealer(() => ({ dealerCards: s.cards, sum: s.sum }));
                }, 1000 * (idx + 1));
            });

            const finalDelay = 1000 * (steps.length + 1);
            setTimeout(() => {
                playerCardsTmp[2].flipped = false;
                setPlayer({ playerCards: playerCardsTmp, sum: playerSumTmp });
            }, finalDelay + 500);

            setTimeout(() => {
                const finalDealerSum = steps.length ? steps[steps.length - 1].sum : sumCards(dealerCardsTmp);
                const pSum = player.sum;
                let endUpMoney = result.money;

                let outcome;
                if (pSum > 21) { outcome = "lose"; endUpMoney = playerMoeny - (endUpMoney * 2); }
                else if (finalDealerSum > 21) { outcome = "win"; endUpMoney += (playerMoeny * 2); }
                else if (pSum > finalDealerSum) { outcome = "win"; endUpMoney += (playerMoeny * 2); }
                else if (pSum < finalDealerSum) { outcome = "lose"; endUpMoney = playerMoeny - (endUpMoney * 2); }
                else { outcome = "push"; endUpMoney = playerMoeny; }

                setResult({ gameState: outcome, money: endUpMoney, endGame: true });
            }, finalDelay + 1000);
        }, 1000);
        
        
    } 

    return (
        <>
            {!result.endGame ? <>
                <Header />
                <MoneyCount playerMoeny={playerMoeny} />
                <Dealer cards={dealer.dealerCards} />
                <PlayerOptions handleHit={handleHit} playerSum={player.sum} handleStand={handleStand} handleDouble={handleDouble} moneySelected={moneySelected}/>
                <Player cards={player.playerCards}/>
                </> : <App playerMoney={result.money}/>
            }
        </>
    );
}

function sumCards(cardsArray) {
    let sum = 0;
    let isAce = 0;
    for (let i = 0; i < cardsArray.length; i++) {
        if (cardsArray[i].rank === "A") {
            isAce++;
        } else {
            sum += cardsArray[i].value || 0;
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
    const value = gameCards[randomIndex].value || (gameCards[randomIndex].fvalue || 0);
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

function PlayerOptions({ handleHit, playerSum, handleStand, handleDouble, moneySelected }) {
    let disabledHit = false;
    let disabledStand = false;
    let disabledDouble = false;
    if (playerSum > 21) { disabledHit = true; disabledStand = true; disabledDouble = true}

    return (
        <div className="btns-options">
            <button className="btn-hit" disabled={disabledHit} onClick={handleHit}>hit</button>
            <button className="btn-stand" disabled={disabledStand} onClick={handleStand}>stand</button>
            <button className="btn-double" disabled={disabledDouble} onClick={handleDouble}>double</button>
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

export default Game;