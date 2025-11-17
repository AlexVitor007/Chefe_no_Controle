import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <img src={logo} alt="Chefe no Controle" className="home-logo" />

        <div className="home-login-area">
          <span className="home-question">JÁ POSSUI CADASTRO?</span>
          <button className="home-btn-outline" onClick={() => navigate("/login")}>
            Fazer Login
          </button>
          <button className="home-btn-filled" onClick={() => navigate("/register")}>
            Fazer Cadastro
          </button>
        </div>
      </header>

      <main className="home-content">
        <h1 className="home-title">
          CONHEÇA A IMENSIDÃO DE{" "}
          <span className="highlight-green">RECEITAS</span> QUE DÁ PARA FAZER
          APENAS COM O QUE VOCÊ TEM NA{" "}
          <span className="highlight-green">GELADEIRA</span>!!
        </h1>

        <p className="home-subtitle">
          Junte-se ao chefe no controle e desbrave seu catálogo
        </p>

        <button className="home-big-btn" onClick={() => navigate("/register")}>
          Fazer Cadastro
        </button>
      </main>
    </div>
  );
}