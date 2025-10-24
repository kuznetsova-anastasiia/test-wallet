import "./TransactionsList.scss";
import transactionsData from "../../data/transactions.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
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
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function TransactionsList() {
  const navigate = useNavigate();

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
    // Use company name as seed for consistent colors per company
    const seed = company.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    // Generate consistent dark colors based on company name
    const hue = Math.abs(seed) % 360;
    const saturation = 60 + (Math.abs(seed) % 30); // 60-90%
    const lightness = 25 + (Math.abs(seed) % 15); // 25-40% (dark)

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // For the last week (7 days or less): display the day name
    if (diffDays <= 7) {
      return date.toLocaleDateString("en-US", { weekday: "long" });
    }

    // For older entries: display the date
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
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

  const handleTransactionClick = (id: number) => {
    navigate(`/transaction/${id}`);
  };

  return (
    <div className="TransactionsList">
      <h2 className="TransactionsList__title">Latest Transactions</h2>
      <div className="TransactionsList__container">
        {transactionsData.map((transaction) => (
          <div
            key={transaction.id}
            className="TransactionsList__item"
            onClick={() => handleTransactionClick(transaction.id)}
          >
            <div
              className="TransactionsList__icon"
              style={{
                backgroundColor: getRandomDarkBackground(
                  transaction.company || "Store"
                ),
              }}
            >
              <FontAwesomeIcon icon={getIcon(transaction.company || "Store")} />
            </div>
            <div className="TransactionsList__details">
              <div className="TransactionsList__details-header">
                <h3 className="TransactionsList__company">
                  {transaction.company || "Payment"}
                </h3>

                <div className="TransactionsList__amount">
                  <div className="TransactionsList__amount-value">
                    {transaction.type === "credit" ? "+" : ""}$
                    {formatNumber(transaction.amount)}
                  </div>
                  {transaction.type === "debit" &&
                    getCashback(transaction.company || "") && (
                      <div className="TransactionsList__cashback">
                        {getCashback(transaction.company || "")}
                      </div>
                    )}

                  <FontAwesomeIcon
                    className="TransactionsList__arrow"
                    icon={faChevronRight}
                  />
                </div>
              </div>

              <p className="TransactionsList__description">
                {transaction.status === "pending"
                  ? "Pending - Card Number Used"
                  : transaction.description}
              </p>
              <p className="TransactionsList__date">
                {transaction.user ? `${transaction.user} - ` : ""}
                {formatDate(transaction.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
