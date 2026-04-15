import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import DealerDashboard from "./pages/DealerDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dealer" element={<DealerDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}
