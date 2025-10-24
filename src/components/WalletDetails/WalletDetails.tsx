import "./WalletDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function WalletDetails() {
  const limit = 1500;
  const balance = 17.3;
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
          <p className="WalletDetails__balance-available">
            ${formatNumber(available)} Available
          </p>
        </div>

        <div className="WalletDetails__points">
          <h2 className="WalletDetails__points-title">Daily Points</h2>
          <p className="WalletDetails__points-amount">456K</p>
        </div>
      </div>

      <div className="WalletDetails__payment-due">
        <h2 className="WalletDetails__payment-due-title">No Payment Due</h2>
        <p className="WalletDetails__payment-due-description">
          You've paid your September balance.
        </p>
        <FontAwesomeIcon
          className="WalletDetails__payment-due-icon"
          icon={faCheck}
        />
      </div>
    </div>
  );
}
