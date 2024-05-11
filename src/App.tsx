import { Routes, Route } from "react-router-dom";
import FrameWithFooter from "./component/FrameWithFooter";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import IndividualPage from "./pages/IndividualPage";
import ParticipationHistoryPage from "./pages/ParticipationHistoryPage";
import RewardHistoryPage from "./pages/RewardHistoryPage";
import DepositHistoryPage from "./pages/DepositHistoryPage";
import WithdrawHistoryPage from "./pages/WithdrawHistoryPage";
import BankAccountPage from "./pages/BankAccountPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import WithdrawPointPage from "./pages/WithdrawPointPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/individual" element={<IndividualPage />} />

      <Route path="/participation_history" element={<ParticipationHistoryPage />} />
      <Route path="/reward_history" element={<RewardHistoryPage />} />
      <Route path="/deposit_history" element={<DepositHistoryPage />} />
      <Route path="/withdrawal_history" element={<WithdrawHistoryPage />} />
      <Route path="/bank_account" element={<BankAccountPage />} />
      <Route path="/change_password" element={<ChangePasswordPage />} />
      <Route path="/withdraw_point" element={<WithdrawPointPage />} />

      <Route path="app" element={<FrameWithFooter />}>
        {/* หน้าอื่นๆที่มี Footer */}
        {/* เช่น <Route path="homepage" element={<Homepage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
