import "./Transaction.scss";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import transactionsData from "../../data/transactions.json";

export default function Transaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const transaction = transactionsData.find(
    (t) => t.id === parseInt(id || "0")
  );

  if (!transaction) {
    navigate("/wallet");
    return null;
  }

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleBackClick = () => {
    navigate("/wallet");
  };

  return (
    <div className="Transaction">
      <div className="Transaction__header">
        <button className="Transaction__back-button" onClick={handleBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div className="Transaction__amount-section">
        <div className="Transaction__amount">
          ${formatNumber(transaction.amount)}
        </div>
        <div className="Transaction__vendor-info">
          <div className="Transaction__vendor">
            {transaction.company || "Payment"}
          </div>
          <div className="Transaction__date">
            {formatDate(transaction.date)}
          </div>
        </div>
      </div>

      <div className="Transaction__card">
        <div className="Transaction__card-section">
          <div className="Transaction__status">
            <span className="Transaction__status-label">Status:</span>
            <span className="Transaction__status-value">Approved</span>
          </div>
          <div className="Transaction__payment-method">RBC Bank Debit Card</div>
        </div>

        <div className="Transaction__divider"></div>

        <div className="Transaction__card-section">
          <div className="Transaction__total">
            <span className="Transaction__total-label">Total</span>
            <span className="Transaction__total-amount">
              ${formatNumber(transaction.amount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
