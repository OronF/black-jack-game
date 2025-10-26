import { useState } from 'react';
import '../css/CoinsPanal.css';

function CoinsPanal() {
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
                <button className="all-in-button" onclick={}>All In!</button>
            </div>
            <div className="button-continer">
                <StartButton disabled={true} />
            </div>
        </>    
    );
}

function StartButton({disabled}) {
  return (
    <button disabled={disabled} className="startBtn">start</button>
  );
}

function AllInPopUp() {
    return (
        <>
            <div className="pop-up">
                <header className="pop-up-header">
                    All In
                </header>

                <p>Are you sure you want to go all in?</p>

                <div className="btns">
                    <button className="btn-cancel">cancel</button>
                    <button className="btn-approve">yeah baby</button>
                </div>
            </div>
        </>
    )
}

export default CoinsPanal;