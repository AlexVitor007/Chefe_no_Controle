import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "./assets/avatar.png";
import API_URL from "./services/api";

import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const emailLogged = localStorage.getItem("usuarioEmail");

  useEffect(() => {
    async function fetchUser() {
      if (!emailLogged) {
        navigate("/");
        return;
      }
      try {
        const res = await fetch(`${API_URL}usuarios/me/`, {
          headers: { "X-User-Email": emailLogged },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [emailLogged, navigate]);

  async function handleUpdateEmail() {
    if (!newEmail) return alert("Informe o novo e-mail");
    try {
      const res = await fetch(`${API_URL}usuarios/update-email/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": emailLogged,
        },
        body: JSON.stringify({ new_email: newEmail }),
      });
      const d = await res.json();
      if (!res.ok) return alert(d.erro || "Erro ao atualizar email");

      localStorage.setItem("usuarioEmail", d.email);
      setUser({ ...user, email: d.email });
      alert("Email atualizado!");
    } catch (err) {
      console.error(err);
      alert("Erro de conexão");
    }
  }

  async function handleUpdatePassword() {
    if (!newPassword) return alert("Informe a nova senha");
    try {
      const res = await fetch(`${API_URL}usuarios/update-password/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": emailLogged,
        },
        body: JSON.stringify({ new_password: newPassword }),
      });
      const d = await res.json();
      if (!res.ok) return alert(d.erro || "Erro ao atualizar senha");

      alert("Senha atualizada!");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      alert("Erro de conexão");
    }
  }

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado.</div>;

  return (
    <div className="profile-page">

      {/* BOTÃO VOLTAR */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Voltar
      </button>

      <div className="profile-card">
        <div className="left">
          <img src={avatarImg} alt="avatar" className="profile-avatar" />
        </div>

        <div className="right">
          <h2 className="profile-name">{user.nome}</h2>

          <div className="profile-field">
            <div className="field-left">
              <p className="muted">Email</p>
              <p className="email-text">{user.email}</p>
            </div>
            <div className="field-right">
              <input
                placeholder="Novo e-mail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button onClick={handleUpdateEmail} className="small-red">
                Alterar Email
              </button>
            </div>
          </div>

          <div className="profile-field">
            <div className="field-left">
              <p className="muted">Senha</p>
              <p className="email-text">********</p>
            </div>
            <div className="field-right">
              <input
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
              <button onClick={handleUpdatePassword} className="small-red">
                Alterar Senha
              </button>
            </div>
          </div>

          <div className="fav-section">
            <button className="fav-btn">Receitas favoritas</button>

            <div className="fav-list">
              {user.favoritos && user.favoritos.length > 0 ? (
                user.favoritos.map((f, idx) => (
                  <div
                    className="fav-item"
                    key={idx}
                    onClick={() => navigate(`/receita/${f.id}`)}  
                    style={{ cursor: "pointer" }}
                  >
                    <img src={f.image || "/placeholder.png"} alt={f.name} />
                    <p>{f.name}</p>
                  </div>
                ))
              ) : (
                <p className="muted">Nenhuma receita favoritada ainda.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}