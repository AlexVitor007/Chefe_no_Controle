import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import RegisterPage from "./RegisterPage.jsx";
import LoginPage from './LoginPage.jsx';
import MainPage from "./MainPage.jsx";
import IngredientesPage from "./IngredientesPage.jsx"; 
import ReceitasPossiveisPage from "./ReceitasPossiveisPage.jsx";
import ReceitasDetalhesPage from "./ReceitasDetalhesPage.jsx";
import ProfilePage from './ProfilePage.jsx';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/ingredientes" element={<IngredientesPage />} />
        <Route path="/receitas" element={<ReceitasPossiveisPage />} />
        <Route path="/receita/:id" element={<ReceitasDetalhesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}