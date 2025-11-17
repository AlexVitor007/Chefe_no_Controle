import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import logo from './assets/logo.png';
import avatar from './assets/avatar.png';
import './MainPage.css'

export default function MainPage() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState(null)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/greeting/')
      .then(res => setGreeting(res.data.message))
      .catch(() => {
        setGreeting('Bem-vindo');
      })
  }, [])

  return (
    <div className="page">
      <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
        <div className="top-section">
          <div className="menu-toggle" onClick={() => setExpanded(!expanded)}>
            ☰
          </div>
        </div>

        <div className="logo-section">
          <img src={logo} alt="logo chefe no controle" className="logo" />
        </div>

        <div className="icons">

          <div className="icon">
            📸
            {expanded && <span className="icon-label">Blog</span>}
          </div>

          <div className="icon" onClick={() => navigate("/ingredientes")}>
            📚
            {expanded && <span className="icon-label">Receitas</span>}
          </div>

          <div className="icon" onClick={() => window.location.href = '/'}>
            ➜
            {expanded && <span className="icon-label">Logout</span>}
          </div>

        </div>
      </aside>

      <main className="content">
        <div className="topbar">
          <div className="search">
            <input
              placeholder="O que estamos procurando hoje?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="avatar" onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
            <img src={avatar} alt="perfil" />
          </div>
        </div>

        <section className="hero">
          <h1 className="welcome">
            {greeting ? greeting.replace(',', '') : 'Carregando...'}
            <br />
            <span className="user">Chefe!</span>
          </h1>

          <div className="buttons">
            <button
              className="btn primary"
              onClick={() => window.location.href = "/ingredientes"}
            >
              Receitas
            </button>

            <button
              className="btn primary"
              onClick={() => {
                alert("Essa funcionalidade será adicionada no futuro!");
              }}
            >
              Blog
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}