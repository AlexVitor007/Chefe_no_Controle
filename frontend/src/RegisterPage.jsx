import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import prato from "./assets/comida.png";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("Enviando...");

    try {
      const resposta = await fetch("http://127.0.0.1:8000/api/usuarios/cadastro/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        setMensagem("Usuário cadastrado com sucesso!");

        setTimeout(() => navigate("/login"), 800);

        setFormData({ nome: "", email: "", senha: "" });
      } else {
        setMensagem(data.erro || "Erro ao cadastrar usuário.");
      }
    } catch (erro) {
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-left">
          <img src={prato} alt="Comida" className="register-image" />
        </div>

        <div className="register-right">
          <h2>Cozinhar nunca foi tão fácil!</h2>
          <p>Cadastre-se para descobrir novas receitas.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Seu nome de usuário"
              value={formData.nome}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Seu melhor e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="senha"
              placeholder="Crie sua senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />

            <button type="submit">Vamos cozinhar!</button>
          </form>

          {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>
      </div>
    </div>
  );
}