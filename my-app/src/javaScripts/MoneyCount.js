import '../css/MoneyCount.css';

function MoneyCount({ count }) {
    return (
        <div className="money-count">
            <input className="input-money-count" value={`${count}$`} disabled={true}/>
        </div>
    );
} 

export default MoneyCount;