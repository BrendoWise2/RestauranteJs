import React, { useState } from "react";
import ClienteList from "./ClienteList";
import MesasList from "./MesasList";

function RestauranteView({ restaurante, atualizarRestaurante }) {
    const [view, setView] = useState("default"); // Gerenciar abas: default, mesas, clientes
    const [novoCliente, setNovoCliente] = useState({ nome: "", telefone: "", email: "", cpf: "", restauranteCliente:"" }); // Estado para o novo cliente

    if (!restaurante) {
        return <p>Nenhum restaurante selecionado.</p>;
    }

    // Função para adicionar um novo cliente
    const handleAddCliente = async () => {
        if (novoCliente.nome && novoCliente.telefone && novoCliente.email && novoCliente.cpf && novoCliente.restauranteCliente) {
            const clienteComRestaurante = {
                ...novoCliente,
                restauranteId: restaurante.id // Associar ao ID do restaurante
            };

            try {
                // Enviar para o backend (ajuste a URL conforme sua API)
                const response = await fetch("http://localhost:8080/cliente", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(clienteComRestaurante),
                });

                if (response.ok) {
                    // Atualizar a lista de clientes após o cadastro
                    const novosClientes = [...(restaurante.clientes || []), clienteComRestaurante];
                    atualizarRestaurante({
                        ...restaurante,
                        clientes: novosClientes,
                    });
                    setNovoCliente({ nome: "", telefone: "", email: "", cpf: "", restauranteCliente:""}); // Limpa o formulário
                } else {
                    const erro = await response.json();
                    alert("Erro ao cadastrar cliente: " + erro.message);
                }
            } catch (error) {
                console.error("Erro ao cadastrar cliente", error);
            }
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    };

    // Função para atualizar o estado do novo cliente
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoCliente({ ...novoCliente, [name]: value });
    };

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

            {/* Exibir formulário para cadastrar um cliente */}
            {view === "clientes" && (
                <div>
                    <h3>Cadastrar Novo Cliente</h3>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do Cliente"
                        value={novoCliente.nome}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF do Cliente"
                        value={novoCliente.cpf}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone do Cliente"
                        value={novoCliente.telefone}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail do Cliente"
                        value={novoCliente.email}
                        onChange={handleInputChange}
                    />

                    <input
                        type="text"
                        name="restauranteCliente"
                        placeholder="Restaurante"
                        value={novoCliente.restauranteCliente}
                        onChange={handleInputChange}
                    />

                    <button onClick={handleAddCliente}>Cadastrar Cliente</button>

                    {/* Exibir lista de clientes cadastrados */}
                    <h3>Lista de Clientes</h3>
                    <ClienteList clientes={restaurante.clientes || []} />
                </div>
            )}

            {/* Exibir conteúdo com base na aba selecionada */}
            {view === "mesas" && <MesasList />}
        </div>
    );
}

export default RestauranteView;
