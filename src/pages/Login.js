import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [haslo, setHaslo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        haslo,
      });
      if (response.data.success) {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("userID", response.data.userID);
        
        window.location.href = "/";
      } else {
        setErrorMessage("Niepoprawne dane logowania");
      }
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  return (
    <div className="login">
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hasło:</label>
          <input
            type="password"
            value={haslo}
            onChange={(e) => setHaslo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Zaloguj</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Login;
