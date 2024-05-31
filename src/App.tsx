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
import GamePage from "./pages/GamePage";
import CautionPage from "./pages/CautionPage";
import ManageTransactionPage from "./pages/admin/ManageTransactionPage";
import ManageUserPointPage from "./pages/admin/ManageUserPointPage";
import ManageUserDataPage from "./pages/admin/ManageUsersPage";

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
          <Route path="admin">
            <Route
              path="manage-transaction"
              element={<ManageTransactionPage />}
            />
            <Route path="manage-point" element={<ManageUserPointPage />} />
            <Route path="manage-user" element={<ManageUserDataPage />} />
          </Route>
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
          <Route path="caution" element={<CautionPage />} />
          <Route
            path="game/1/:id"
            element={
              <GamePage
                imageSrc="/banner3.png"
                left={import.meta.env.VITE_GAME1_LEFT}
                right={import.meta.env.VITE_GAME1_RIGHT}
              />
            }
          />
          <Route
            path="game/2/:id"
            element={
              <GamePage
                imageSrc="/banner4.png"
                left={import.meta.env.VITE_GAME2_LEFT}
                right={import.meta.env.VITE_GAME2_RIGHT}
              />
            }
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
