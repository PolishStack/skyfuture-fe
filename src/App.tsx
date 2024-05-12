import { Routes, Route } from "react-router-dom";
import FrameWithFooter from "./component/Frame/FrameWithFooter";
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
import { Box } from "@mantine/core";
import CustomerServicePage from "./pages/CustomerServicePage";
import RegisterPage from "./pages/RegisterPage";
import LoginGuard from "./component/LoginGuard";

function App() {
  return (
    <Box
      maw="540px"
      mx="auto"
      style={{
        boxShadow:
          "0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route
          path="app"
          element={
            <LoginGuard>
              <FrameWithFooter />
            </LoginGuard>
          }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="individual" element={<IndividualPage />} />
          <Route path="change_password" element={<ChangePasswordPage />} />
          <Route path="customer_service" element={<CustomerServicePage />} />
          <Route
            path="participation_history"
            element={<ParticipationHistoryPage />}
          />
          <Route path="reward_history" element={<RewardHistoryPage />} />
          <Route path="deposit_history" element={<DepositHistoryPage />} />
          <Route path="withdrawal_history" element={<WithdrawHistoryPage />} />
          <Route path="bank_account" element={<BankAccountPage />} />
          <Route path="withdraw_point" element={<WithdrawPointPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
