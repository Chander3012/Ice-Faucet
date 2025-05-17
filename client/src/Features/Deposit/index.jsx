import React, {useEffect} from "react";
import style from "./style.module.css";

const Deposit = () => {

  useEffect(() => {
    document.title = "Deposit - ICE Faucet";
  }, []);

  return (
    <div className={`container mt-4 ${style.wrapper}`}>
      <h2 className="text-center mb-4">Deposit</h2>

      <div className={`card shadow ${style.card}`}>
        <div className="card-body">
          <h5 className="card-title">Total Deposit</h5>
          <p className={`card-text ${style.amount}`}>$0.00</p>
          <button className={`btn btn-primary ${style.button}`}>
            Add Deposit
          </button>
        </div>
      </div>

      <div className={`card shadow mt-4 ${style.card}`}>
        <div className="card-body">
          <h5 className="card-title">Transaction History</h5>
          <ul className="list-group">
            <li className={`list-group-item ${style.listItem}`}>
              No transactions yet.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
