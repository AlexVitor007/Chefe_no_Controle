import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ReceitasDetalhesPage.css";
import logo from "./assets/logo.png";
import avatar from "./assets/avatar.png";
import API_URL from "./services/api";


const MAPA_INGREDIENTES = {
    "Chicken": "Frango",
    "Minced Beef": "Carne Moída",
    "Beef": "Bife",
    "Fish": "Peixe",
    "Rice": "Arroz",
    "Beans": "Feijão",
    "Tomato": "Tomate",
    "Milk": "Leite",
    "Egg": "Ovo",
    "Butter": "Manteiga",
    "Onion": "Cebola",
    "Potato": "Batata",
    "Pasta": "Macarrão",
    "Garlic": "Alho",
    "Flour": "Farinha",
    "Sugar": "Açúcar",
    "Salt": "Sal"
};

export default function ReceitasDetalhesPage() {

    const { id } = useParams();
    const [expanded, setExpanded] = useState(false)
    const [receita, setReceita] = useState(null);
    const [loading, setLoading] = useState(true);

    function gerarTempoAleatorio() {
        const min = 20;
        const max = 50;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function traduzirIngrediente(item) {
        const [nome, medida] = item.split(" - ");
        const traduzido = MAPA_INGREDIENTES[nome.trim()] || nome;
        return `${traduzido} - ${medida}`;
    }

    useEffect(() => {
        async function fetchReceita() {
            try {
                const resp = await fetch(`${API_URL}receita_detalhe/?id=${id}`);
                const data = await resp.json();

                if (data.receita) {
                    const novaReceita = {
                        ...data.receita,
                        tempo: `${gerarTempoAleatorio()} minutos`,
                        ingredientes: data.receita.ingredientes.map(traduzirIngrediente)
                    };
                    setReceita(novaReceita);
                }
            } catch (err) {
                console.error("Erro ao carregar receita:", err);
            }
            setLoading(false);
        }

        fetchReceita();
    }, [id]);

    if (loading) return <h2 className="carregando">Carregando...</h2>;
    if (!receita) return <h2 className="carregando">Receita não encontrada.</h2>;

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


            <main className="content-receita">

                <div className="detalhes-container">

                    <div className="imagem-wrapper">
                        <img src={receita.thumb} alt={receita.nomePT} className="detalhe-imagem" />
                    </div>

                    <h1 className="titulo">{receita.nomePT}</h1>

                    <h3 className="subtitulo">⏱ Tempo de preparo:</h3>
                    <p className="texto">{receita.tempo}</p>

                    <h3 className="subtitulo">📌 Ingredientes:</h3>
                    <ul className="lista">
                        {receita.ingredientes.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h3 className="subtitulo">👨‍🍳 Modo de preparo:</h3>
                    <ul className="lista">
                        {receita.modo_preparo.map((passo, index) => (
                            <li key={index}>{passo}</li>
                        ))}
                    </ul>

                    <button
                        className="btn-voltar"
                        onClick={() => window.history.back()}
                    >
                        ⬅ Voltar
                    </button>

                </div>
            </main>
        </div>
    );
}