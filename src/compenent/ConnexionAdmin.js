import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../style/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérifier si les valeurs entrées correspondent aux informations de connexion valides
    if (username === 'Admin' && password === 'Admin') {
      // Naviguer vers la page de tableau de bord
      navigate("/Admin");
    } else {
      // Afficher un message d'erreur si les informations de connexion sont incorrectes
      setLoginError(true);
    }
  };

  return (
    <div className="login-page-container">
      <h1 className="login-page-heading">Se connecter</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Nom d'utilisateur:
          <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="login-label">
          Mot de passe:
          <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {loginError && <p className="login-error">Le nom d'utilisateur ou le mot de passe est incorrect.</p>}
        <button className="login-button" type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
