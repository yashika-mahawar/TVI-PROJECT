import React from "react";
import { useNavigate } from "react-router-dom";
import "../PaymentSuccess/PaymentSuccess.css";
function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">
        {/* Failed icon styling */}
        <div className="check" style={{ backgroundColor: "#fee2e2", color: "#ef4444" }}>
          ✖
        </div>
        
        <h1 style={{ color: "#ef4444" }}>Payment Failed ❌</h1>
        <p>
          We couldn't process your payment. Please check your internet 
          connection or try using a different payment method.
        </p>

        <div className="button-group" style={{ marginTop: "20px" }}>
          <button 
            className="primary-btn" 
            onClick={() => navigate("/payment")}
            style={{ backgroundColor: "#ef4444", border: "none" }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailure;