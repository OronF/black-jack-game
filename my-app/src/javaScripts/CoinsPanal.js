import { useState } from 'react';
import '../css/CoinsPanal.css';

function CoinsPanal({ count }) {
    const [isPopUp, setPopUp] = useState(false);
    

    return (
        <>
            <div className="coins-panal-container">
                <ul className="coins-panal">
                    <li key="1" className="coin">5$</li>
                    <li key="2" className="coin">10$</li>
                    <li key="3" className="coin">25$</li>
                    <li key="4" className="coin">100$</li>
                    <li key="5" className="coin">500$</li>
                </ul>
                <button
                  className="all-in-button"
                  onClick={() => setPopUp(true)}
                >
                  All In!
                </button>

                {isPopUp && <AllInPopUp onClose={() => setPopUp(false)} />}
            </div>
            
        </>    
    );
}

export function StartButton({disabled, onStart}) {
  return (
    <button disabled={disabled} className="startBtn" onClick={onStart}>start</button>
  );
}

function AllInPopUp({ onClose }) {
    return (
        <div className="pop-up-overlay" onClick={onClose}>
            <div className="pop-up" onClick={e => e.stopPropagation()}>
                <header className="pop-up-header">
                    All In
                </header>

                <p>Are you sure you want to go all in?</p>

                <div className="btns">
                    <button className="btn-cancel" onClick={onClose}>cancel</button>
                    <button className="btn-approve">yeah baby</button>
                </div>
            </div>
        </div>
    );
}

export default CoinsPanal;