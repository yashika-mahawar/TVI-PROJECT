import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // LOGIN
  const login = (email) => {
    setUser({ email, isLoggedIn: true, paymentDone: false });
  };

  // SIGNUP
  const signup = (data) => {
    setUser({ ...data, isLoggedIn: true, paymentDone: false });
  };

  // PAYMENT COMPLETE (mock)
  const completePayment = (plan) => {
    setUser((prev) => ({
      ...prev,
      plan,
      paymentDone: true,
    }));
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, completePayment }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);