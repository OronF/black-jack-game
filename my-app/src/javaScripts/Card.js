import { useState } from 'react';
import "../css/Card.css";

function Card({rank, suit}) {
    const [flipped, setFlipped] = useState(false);

    function cardClick() {
        setFlipped(v => !v);
    }

    return (
    <div className="card-wrapper">
      <div className={`card${flipped ? ' flipped' : ''}`} data-suit={suit} onClick={cardClick}>
          <div className="front">
              <div className="suit top-left" data-suit={suit}>{suit}</div>
              <div className="rank">{rank}</div>
              <div className="suit bottom-right" data-suit={suit}>{suit}</div>
          </div>

          <div className="back"></div>
      </div>
    </div>
    );
}

export default Card;