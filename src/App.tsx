import { Routes, Route } from "react-router-dom";
import FrameWithFooter from "./component/FrameWithFooter";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="app" element={<FrameWithFooter />}>
        {/* หน้าอื่นๆที่มี Footer */}
        {/* เช่น <Route path="homepage" element={<Homepage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
