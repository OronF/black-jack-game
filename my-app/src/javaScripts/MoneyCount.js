//import { useState } from 'react';
import '../css/MoneyCount.css';

function MoneyCount({ count }) {
    //const [needMoney, setNeedMoney] = useState(false);
//{!needMoney && <Get100$OnTheHouse onClose={() => setNeedMoney(true)}/>}
    return (
        <>
            
            <div className="money-count">
                <input className="input-money-count" value={`${count}$`} disabled={true}/>
            </div>
        </>
        
    );
} 

function Get100$OnTheHouse({ onClose }) {
    return (
        <div className="pop-up-overlay" onClick={onClose}>
            <div className="pop-up" onClick={e => e.stopPropagation()}>
                <header className="pop-up-header">
                    On The House
                </header>

                <p>You have no money to play here is 100$ on us so you can keep playing!</p>

                <div className="btn">
                    <button className="btn-cancel" onClick={onClose}>close</button>
                </div>
            </div>
        </div>
    );
}

export default MoneyCount;