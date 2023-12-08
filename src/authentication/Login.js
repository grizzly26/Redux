import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions";
import "./style.css";

const Login = ({ setLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    if (!email || !password) {
      setErrors({ message: "Пожалуйста, введите и email, и пароль." });
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/users");
      if (!response.ok) {
        throw new Error("Не удалось получить данные пользователя");
      }

      const users = await response.json();

      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("isAuthenticated", "true");
        setLoggedIn(true);
        dispatch(loginUser(user)); 
        navigate("/home");
      } else {
        setErrors({ message: "Неверный email или пароль." });
      }
    } catch (error) {
      console.error("Ошибка во время аутентификации:", error);
      setErrors({ message: "Произошла ошибка во время аутентификации." });
    }
  };

  return (
    <div className="container">
      <fieldset>
        <div>
          <h1>Login</h1>
          <hr />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Введите email"
            className="rect"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="rect"
            value={password}
            placeholder="Введите пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Войти
          </button>

          {errors.message && <p className="login-error">{errors.message}</p>}
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
