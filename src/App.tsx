import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import TransactionPage from "./pages/TransactionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <TransactionPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/login/admin" element={<LoginAdminPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
