import { useState } from 'react';
import '../css/CoinsPanal.css';

function CoinsPanal({ selectedMoney, coinsOnClick, handleClear, handleAllIn}) {
    const [isPopUp, setPopUp] = useState(false);

    return (
        <>
            <div className="selected-money">You wanna play with: {selectedMoney}$</div>
            <div className="coins-panal-container">
                <ul className="coins-panal">
                    <li key="1" className="coin" onClick={() => coinsOnClick(5)}>5$</li>
                    <li key="2" className="coin" onClick={() => coinsOnClick(10)}>10$</li>
                    <li key="3" className="coin" onClick={() => coinsOnClick(25)}>25$</li>
                    <li key="4" className="coin" onClick={() => coinsOnClick(100)}>100$</li>
                    <li key="5" className="coin" onClick={() => coinsOnClick(500)}>500$</li>
                </ul>
                <button
                  className="all-in-button"
                  onClick={() => setPopUp(true)}
                >
                  All In!
                </button>

                <button className="clear-btn" onClick={handleClear}>Clear</button>

                {isPopUp && <AllInPopUp handleAllIn={handleAllIn} onClose={() => setPopUp(false)} />}
            </div>
            
        </>    
    );
}

export function StartButton({disabled, onStart}) {
  return (
    <button disabled={disabled} className="startBtn" onClick={onStart}>start</button>
  );
}

function AllInPopUp({ handleAllIn, onClose }) {
    return (
        <div className="pop-up-overlay" onClick={onClose}>
            <div className="pop-up" onClick={e => e.stopPropagation()}>
                <header className="pop-up-header">
                    All In
                </header>

                <p>Are you sure you want to go all in?</p>

                <div className="btns">
                    <button className="btn-cancel" onClick={onClose}>cancel</button>
                    <button className="btn-approve" onClick={() => {handleAllIn(); onClose()}}>yeah baby</button>
                </div>
            </div>
        </div>
    );
}

export default CoinsPanal;