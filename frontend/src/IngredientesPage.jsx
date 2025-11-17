import React, { useState } from "react";
import "./IngredientesPage.css";
import logo from "./assets/logo.png";
import avatar from "./assets/avatar.png";

export default function IngredientesPage() {
    const [expanded, setExpanded] = useState(false);
    const [search, setSearch] = useState("");
    const [selecionados, setSelecionados] = useState([]);

    const categorias = {
        "Ingredientes Essenciais": [
            "Ovos", "Leite", "Manteiga", "Farinha", "Arroz", "Feijão",
            "Macarrão", "Azeite", "Sal", "Açúcar", "Pão", "Batata",
            "Cebola", "Alho", "Tomate"
        ],
        "Carnes e Proteínas": [
            "Frango", "Carne Moída", "Bife", "Peixe", "Linguiça",
            "Atum", "Presunto", "Bacon", "Salsicha", "Ovos"
        ],
        "Vegetais e Hortaliças": [
            "Cenoura", "Brócolis", "Couve", "Espinafre", "Abóbora",
            "Pimentão", "Ervilha", "Milho", "Repolho"
        ],
        "Frutas": [
            "Banana", "Maçã", "Laranja", "Limão", "Abacate",
            "Morango", "Uva", "Manga", "Abacaxi"
        ],
        "Temperos e Especiarias": [
            "Pimenta", "Orégano", "Manjericão", "Cominho", "Colorau",
            "Curry", "Páprica", "Mostarda", "Alho em pó"
        ],
        "Bebidas": [
            "Água", "Leite", "Suco", "Refrigerante", "Café", "Chá"
        ]
    };

    const toggleItem = (item) => {
        setSelecionados(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        );
    };

    const ingredientesFiltrados = (lista) => {
        return lista.filter(i => i.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <div className="page">

            {/* Sidebar */}
            <aside className={`sidebar ${expanded ? "expanded" : ""}`}>
                <div className="top-section">
                    <div className="menu-toggle" onClick={() => setExpanded(!expanded)}>
                        ☰
                    </div>
                </div>

                <div className="logo-section">
                    <img src={logo} alt="logo" className="logo" />
                </div>

                <div className="icons">
                    <div className="icon" onClick={() => window.location.href = "/main"}> 🏠
                        {expanded && <span className="icon-label">Início</span>}
                    </div>

                    <div className="icon" onClick={() => window.location.href = "/ingredientes"}> 📚
                        {expanded && <span className="icon-label">Receitas</span>}
                    </div>

                    <div className="icon" onClick={() => window.location.href = "/"}> ➜
                        {expanded && <span className="icon-label">Logout</span>}
                    </div>
                </div>
            </aside>


            <main className="content-ingredientes">

                <div className="topbar">
                    <div className="search">
                        <input
                            placeholder="Buscar ingrediente..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="avatar" onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
                        <img src={avatar} alt="perfil" />
                    </div>
                </div>


                <div className="ingredientes-container">

                    {Object.entries(categorias).map(([categoria, itens]) => (
                        <div className="categoria-card" key={categoria}>
                            <h2 className="categoria-titulo">{categoria}</h2>

                            <div className="grid-ingredientes">
                                {ingredientesFiltrados(itens).map((item) => (
                                    <label className="item" key={item}>
                                        <input
                                            type="checkbox"
                                            checked={selecionados.includes(item)}
                                            onChange={() => toggleItem(item)}
                                        />
                                        <span>{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        className="btn-enviar"
                        onClick={() => {
                            if (selecionados.length === 0) {
                                alert("Selecione ao menos 1 ingrediente!");
                                return;
                            }
                            const query = selecionados.join(",");
                            window.location.href = `/receitas?ing=${query}`;
                        }}
                    >
                        Buscar Receitas Possíveis
                    </button>

                </div>

            </main>
        </div>
    );
}
