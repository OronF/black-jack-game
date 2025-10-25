import { useState } from 'react';
import "../css/Card.css";

function Card() {
    const [fliped, setFliped] = useState(false);

    function cardClick() {
        setFliped(!fliped);
    }

    return (
    <div className="card" onClick={cardClick}>
        <div className="front">
            <div className="rank">A</div>
            <div className="suit">♠</div>
        </div>
        <div className="back"></div>
    </div>
    );
}

export default Card;