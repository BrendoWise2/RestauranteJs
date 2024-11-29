import React, { useState } from "react";
import ClienteList from "./ClienteList";
import MesasList from "./MesasList";

function RestauranteView({ restaurante }) {
    const [view, setView] = useState("default"); // Gerenciar abas: default, mesas, clientes

    if (!restaurante) {
        return <p>Nenhum restaurante selecionado.</p>;
    }

    return (
        <div>
            <h2>Detalhes do Restaurante</h2>
            <p><strong>Nome:</strong> {restaurante.nomeRestaurante}</p>
            <p><strong>CNPJ:</strong> {restaurante.cnpj}</p>
            <p><strong>Endereço:</strong> {restaurante.endereco}</p>
            <p><strong>Telefone:</strong> {restaurante.telefone}</p>
            <p><strong>E-mail:</strong> {restaurante.email}</p>
            <p><strong>Proprietário:</strong> {restaurante.proprietarioRestaurante}</p>

            {/* Navegação entre abas */}
            <div style={{ margin: "20px 0" }}>
                <button onClick={() => setView("default")}>Visão Geral</button>
                <button onClick={() => setView("mesas")}>Gerenciar Mesas</button>
                <button onClick={() => setView("clientes")}>Gerenciar Clientes</button>
            </div>

            {/* Exibir conteúdo com base na aba selecionada */}
            {view === "mesas" && <MesasList />}
            {view === "clientes" && <ClienteList />}
        </div>
    );
}

export default RestauranteView;
