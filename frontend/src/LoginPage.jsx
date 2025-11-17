import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import prato from "./assets/comida.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      const resposta = await fetch("http://127.0.0.1:8000/api/usuarios/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        setMensagem(data.erro || "Email ou senha incorretos.");
        setCarregando(false);
        return;
      }

      localStorage.setItem("usuarioNome", data.nome || "");
      localStorage.setItem("usuarioEmail", data.email || "");
      localStorage.setItem("usuarioID", data.id || "");
      setMensagem("Login realizado! Redirecionando...");
      setCarregando(false);

      setTimeout(() => {
        navigate("/main");
      }, 400);
    } catch (err) {
    setCarregando(false);
    setMensagem("Erro de conexão com o servidor.");
    console.error("Erro no fetch de login:", err);
  }
};

return (
  <div className="login-container">
    <div className="login-card">
      <div className="login-left">
        <h2>Bem-vindo!</h2>
        <p>Entre para continuar sua jornada culinária.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={carregando}>
            {carregando ? "Verificando..." : "Vamos Cozinhar!"}
          </button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>

      <div className="login-right">
        <img src={prato} alt="Comida" className="login-image" />
      </div>
    </div>
  </div>
);
}