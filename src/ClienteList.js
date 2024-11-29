import React, { useState, useEffect } from "react";

function ClienteList({ restauranteId }) {
    const [clientes, setClientes] = useState([]);
    const [novoCliente, setNovoCliente] = useState({ nome: "", email: "" });

    // Buscar clientes do restaurante
    useEffect(() => {
        fetch(`/cliente?restauranteId=${restauranteId}`)
            .then((response) => response.json())
            .then((data) => setClientes(data))
            .catch((error) => console.error("Erro ao buscar clientes:", error));
    }, [restauranteId]);

    // Adicionar cliente
    const adicionarCliente = () => {
        fetch("/cliente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...novoCliente, restauranteId }),
        })
            .then((response) => response.json())
            .then((cliente) => {
                setClientes([...clientes, cliente]);
                setNovoCliente({ nome: "", email: "" }); // Limpar o formulário
            })
            .catch((error) => console.error("Erro ao adicionar cliente:", error));
    };

    return (
        <div>
            <h3>Clientes</h3>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>
                        {cliente.nome} - {cliente.email}
                    </li>
                ))}
            </ul>
            <h4>Adicionar Cliente</h4>
            <div>
                <input
                    type="text"
                    placeholder="Nome"
                    value={novoCliente.nome}
                    onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={novoCliente.email}
                    onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
                />
                <button onClick={adicionarCliente}>Adicionar</button>
            </div>
        </div>
    );
}

export default ClienteList;
