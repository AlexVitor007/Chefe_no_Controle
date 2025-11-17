import React, { useEffect, useState } from "react";
import "./ReceitasPossiveisPage.css";
import logo from "./assets/logo.png";
import avatar from "./assets/avatar.png";
import API_URL from "./services/api";
import { useNavigate } from "react-router-dom";

export default function ReceitasPossiveisPage() {
    const [receitas, setReceitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false)
    const ingredientes = new URLSearchParams(window.location.search).get("ing");
    const navigate = useNavigate();

    async function traduzirNome(nomeEn) {
        try {
            const resp = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(nomeEn)}&langpair=en|pt-br`
            );
            const data = await resp.json();
            return data.responseData.translatedText || nomeEn;
        } catch {
            return nomeEn;
        }
    }

    useEffect(() => {
        async function carregar() {
            try {
                const res = await fetch(`${API_URL}receitas/?ingredientes=${ingredientes}`);
                const data = await res.json();

                if (data.receitas) {
                    const traduzidas = await Promise.all(
                        data.receitas.map(async (r) => ({
                            ...r,
                            nomePT: await traduzirNome(r.strMeal)
                        }))
                    );
                    setReceitas(traduzidas);
                }

                setLoading(false);
            } catch {
                setLoading(false);
            }
        }

        carregar();
    }, [ingredientes]);

    return (
        <div className="page">

            {/* Sidebar */}
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
            <main className="content-ingredientes">

                <div className="topbar">
                    <div className="search">
                        <input disabled value="" />
                    </div>

                    <div className="avatar" onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
                        <img src={avatar} alt="perfil" />
                    </div>
                </div>

                <h2 className="titulo-receitas">
                    {loading ? "Carregando..." : receitas.length === 0 ? "Nenhuma receita encontrada 😕" : "Receitas Encontradas"}
                </h2>

                {!loading && receitas.length > 0 && (
                    <div className="receitas-grid">
                        {receitas.map((r) => (
                            <div
                                className="receita-card"
                                key={r.idMeal}
                                onClick={() => window.location.href = `/receita/${r.idMeal}`}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={r.strMealThumb}
                                    alt={r.strMeal}
                                    className="receita-img"
                                />

                                <h3 className="receita-nome">{r.nomePT}</h3>

                                <button
                                    className="receita-btn"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        const email = localStorage.getItem("usuarioEmail");
                                        if (!email) {
                                            alert("Faça login para favoritar.");
                                            return;
                                        }
                                        try {
                                            const body = {
                                                recipe_id: r.idMeal,
                                                recipe_name: r.nomePT || r.strMeal,
                                                recipe_image: r.strMealThumb
                                            };
                                            const resp = await fetch(`${API_URL}usuarios/favorite/`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    "X-User-Email": email
                                                },
                                                body: JSON.stringify(body)
                                            });
                                            const data = await resp.json();
                                            alert(data.message || "Favoritada!");
                                        } catch (err) {
                                            console.error(err);
                                            alert("Erro ao favoritar");
                                        }
                                    }}
                                >
                                    ❤️ Favoritar
                                </button>
                            </div>
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}