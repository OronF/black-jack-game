import '../css/CoinsPanal.css';

function CoinsPanal() {
    return (
    <div className="coins-panal-container">
        <ul className="coins-panal">
            <li key="1" className="coin">5$</li>
            <li key="2" className="coin">10$</li>
            <li key="3" className="coin">25$</li>
            <li key="4" className="coin">100$</li>
            <li key="5" className="coin">500$</li>
        </ul>
        <button className="all-in-button">All In!</button>
    </div>
        
    );
}

export default CoinsPanal;