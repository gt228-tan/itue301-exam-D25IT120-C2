import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [employee, setEmployee] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const login = (employeeData, tokenValue, roleValue) => {
    setEmployee(employeeData);
    setToken(tokenValue);
    setRole(roleValue);
  };

  const logout = () => {
    setEmployee(null);
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        employee,
        token,
        role,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}