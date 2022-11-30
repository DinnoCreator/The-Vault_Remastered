import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Online from "./pages/Online";
import Signuponline from "./pages/Signup";
import AccModal from "./pages/AccModal";
import Dashboard from "./pages/DashBoard";
import Verify from "./pages/Verify";
import NewAcc from "./pages/NewAcc";
import Transfer from "./pages/Transfer";
import Transaction from "./pages/Transaction";
import Forgotten from "./pages/Forgotten";
import TransView from "./pages/TransView";
import AdminDashboard from "./pages/AdminDash";
import Accounts from "./pages/Accounts";
import CustomerTransaction from "./pages/CustomerTrans";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/online" element={<Online />} />
        <Route path="/signuponline" element={<Signuponline />} />
        <Route path="/status" element={<AccModal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/newaccount" element={<NewAcc />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/reset" element={<Forgotten />} />
        <Route path="/transview" element={<TransView />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/customertrans" element={<CustomerTransaction />} />
      </Routes>
  );
}

export default App;
