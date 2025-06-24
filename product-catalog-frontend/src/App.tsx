import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";

const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID as string;

function App() {
  return (
    <PayPalScriptProvider
      options={{ clientId: paypalClientId, currency: "EUR" }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
