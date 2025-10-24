import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Wallet from "./pages/Wallet";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/wallet" replace />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transaction/:id" element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;
