import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import DealerDashboard from "./pages/DealerDashboard";
import CEOAnalytics from "./pages/CEOAnalytics";
import SubscriptionPage from "./pages/SubscriptionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dealer" element={<DealerDashboard />} />
        <Route path="/analytics" element={<CEOAnalytics />} />
        <Route path="/subscriptions" element={<SubscriptionPage />} />

      </Routes>
    </BrowserRouter>
  );
}
