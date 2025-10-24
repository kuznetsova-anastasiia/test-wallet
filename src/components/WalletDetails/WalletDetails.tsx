import "./WalletDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getPointsForToday } from "../../utils/calculatePoints";

export default function WalletDetails() {
  const limit = 1500;
  const balance = Math.random() * limit; // Random balance between 0 and limit
  const available = limit - balance;

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="WalletDetails">
      <div className="WalletDetails__balance-container">
        <div className="WalletDetails__balance">
          <h2 className="WalletDetails__balance-title">Card Balance</h2>
          <p className="WalletDetails__balance-amount">
            ${formatNumber(balance)}
          </p>
          <p className="WalletDetails__balance-limit">
            ${formatNumber(limit)} Limit
          </p>
          <p className="WalletDetails__balance-available">
            ${formatNumber(available)} Available
          </p>
        </div>

        <div className="WalletDetails__points">
          <h2 className="WalletDetails__points-title">Daily Points</h2>
          <p className="WalletDetails__points-amount">{getPointsForToday()}</p>
        </div>
      </div>

      <div className="WalletDetails__payment-due">
        <h2 className="WalletDetails__payment-due-title">No Payment Due</h2>
        <p className="WalletDetails__payment-due-description">
          You've paid your balance.
        </p>
        <FontAwesomeIcon
          className="WalletDetails__payment-due-icon"
          icon={faCheck}
        />
      </div>
    </div>
  );
}
