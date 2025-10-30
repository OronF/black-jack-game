import MoneyCount from './MoneyCount.js';
import { Header } from './App.js';
import Card from './Card.js';
import '../css/Game.css';
import { gameCards, suits } from './GameCards.js';

function Game() {

    return (
    <>
        <Header />
        <MoneyCount count={1000} />
        <Dealer />
        <PlayerOptions />
        <Player />
    </>)
}

function randomCard() {
    const randomIndex = Math.floor(Math.random() * gameCards.length);
    const rank = gameCards[randomIndex].key;
    const value = gameCards[randomIndex].value;
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return [rank, value, suit];
}

function Dealer() {
    const [rank1, value1, suit1] = randomCard();
    const [rank2, value2, suit2] = randomCard();

    return (
        <>
            <ul className="dealer-cards">
                <li key="1"><Card rank={rank1} suit={suit1}/></li>
                <li key="2"><Card rank={rank2} suit={suit2}/></li>
            </ul>
        </>
    )
}

function PlayerOptions() {
    return (
        <div className="btns-options">
            <button className="btn-hit" disabled={false}>hit</button>
            <button className="btn-stand" disabled={true}>stand</button>
            <button className="btn-double" disabled={true}>double</button>
            <button className="btn-split" disabled={true}>split</button>
        </div>
    );

}

function Player() {
    const [rank1, value1, suit1] = randomCard();
    const [rank2, value2, suit2] = randomCard();

    return (
        <>
            <ul className="player-cards">
                <li key="1"><Card rank={rank1} suit={suit1}/></li>
                <li key="2"><Card rank={rank2} suit={suit2}/></li>
            </ul>
        </>
    )
} 

export default Game;