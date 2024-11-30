import React, { useState } from "react";
import ClienteList from "./ClienteList";
import MesasList from "./MesasList";

function RestauranteView({ restaurante }) {
    const [view, setView] = useState("default"); // Gerenciar abas: default, mesas, clientes
    const [clientes, setClientes] = useState([]); // Estado para armazenar os clientes cadastrados
    const [novoCliente, setNovoCliente] = useState({ nome: "", telefone: "", email: "", cpf: "" }); // Estado para o novo cliente

    if (!restaurante) {
        return <p>Nenhum restaurante selecionado.</p>;
    }

    // Função para adicionar um novo cliente
    const handleAddCliente = () => {
        // Verificar se os campos estão preenchidos
        if (novoCliente.nome && novoCliente.telefone && novoCliente.email && novoCliente.cpf) {
            // Associar o cliente ao restaurante
            const clienteComRestaurante = {
                ...novoCliente,
                restaurante: restaurante // Aqui associamos o restaurante
            };
            setClientes([...clientes, clienteComRestaurante]); // Adiciona o novo cliente na lista
            setNovoCliente({ nome: "", telefone: "", email: "", cpf: "" }); // Limpa o formulário
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
                    <button onClick={handleAddCliente}>Cadastrar Cliente</button>

                    {/* Exibir lista de clientes cadastrados */}
                    <h3>Lista de Clientes</h3>
                    <ClienteList clientes={clientes} />
                </div>
            )}

            {/* Exibir conteúdo com base na aba selecionada */}
            {view === "mesas" && <MesasList />}
        </div>
    );
}

export default RestauranteView;
