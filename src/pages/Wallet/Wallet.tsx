import WalletDetails from "../../components/WalletDetails";
import TransactionsList from "../../components/TransactionsList";
import "./Wallet.scss";

export default function Wallet() {
  return (
    <main className="Wallet">
      <WalletDetails />
      <TransactionsList />
    </main>
  );
}
