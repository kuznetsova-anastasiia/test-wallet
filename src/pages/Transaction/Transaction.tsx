import "./Transaction.scss";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faStore,
  faCoffee,
  faShoppingCart,
  faCar,
  faShoppingBag,
  faGasPump,
  faUtensils,
  faBuilding,
  faPills,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
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

  const getIcon = (company: string): IconDefinition => {
    const iconMap: { [key: string]: IconDefinition } = {
      Apple: faStore,
      IKEA: faStore,
      Starbucks: faCoffee,
      "Whole Foods": faShoppingCart,
      Uber: faCar,
      Amazon: faShoppingBag,
      Shell: faGasPump,
      "McDonald's": faUtensils,
      Employer: faBuilding,
      CVS: faPills,
    };
    return iconMap[company] || faStore;
  };

  const getRandomDarkBackground = (company: string): string => {
    const seed = company.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    const hue = Math.abs(seed) % 360;
    const saturation = 60 + (Math.abs(seed) % 30);
    const lightness = 25 + (Math.abs(seed) % 15);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const getCashback = (company: string) => {
    const cashbackMap: { [key: string]: string } = {
      Apple: "3%",
      IKEA: "2%",
      Starbucks: "1%",
      "Whole Foods": "2%",
      Uber: "1%",
      Amazon: "3%",
      Shell: "2%",
      "McDonald's": "1%",
      CVS: "2%",
    };
    return cashbackMap[company] || null;
  };

  const getTypeDisplay = (type: string) => {
    switch (type) {
      case "debit":
        return "Purchase";
      case "credit":
        return "Deposit";
      case "payment":
        return "Payment";
      default:
        return type;
    }
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
        <div className="Transaction__icon-container">
          <div
            className="Transaction__icon"
            style={{
              backgroundColor: getRandomDarkBackground(
                transaction.company || "Store"
              ),
            }}
          >
            <FontAwesomeIcon icon={getIcon(transaction.company || "Store")} />
          </div>
        </div>
        <div className="Transaction__amount">
          {transaction.type === "credit" ? "+" : ""}$
          {formatNumber(transaction.amount)}
        </div>
        <div className="Transaction__vendor-info">
          <div className="Transaction__vendor">
            {transaction.company || transaction.user}
          </div>
          <div className="Transaction__description">
            {transaction.description}
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
            <span className="Transaction__status-value">
              {transaction.status.charAt(0).toUpperCase() +
                transaction.status.slice(1)}
            </span>
          </div>
          <div className="Transaction__payment-method">RBC Bank Debit Card</div>

          <div className="Transaction__detail-row">
            <span className="Transaction__detail-value">
              {getTypeDisplay(transaction.type)}
            </span>
          </div>

          {transaction.type === "debit" &&
            getCashback(transaction.company || "") && (
              <div className="Transaction__detail-row">
                <span className="Transaction__detail-label">Cashback:</span>
                <span className="Transaction__detail-value cashback">
                  {getCashback(transaction.company || "")}
                </span>
              </div>
            )}
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
