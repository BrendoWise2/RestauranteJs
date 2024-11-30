import React, { useState, useEffect } from 'react';

const ClienteForm = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    restaurante: { id: 1 } // Exemplo de restaurante com ID 1
  });

  useEffect(() => {
    // Carregar lista de clientes do backend
    fetch("/api/cliente")
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Erro ao carregar clientes:', error));
  }, []);

  const handleAddCliente = () => {
    // Enviar novo cliente para o backend
    fetch("/api/cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoCliente)
    })
      .then(response => response.json())
      .then(data => {
        // Atualizar o estado com o cliente recém-criado
        setClientes([...clientes, data]);
        // Limpar o formulário após salvar
        setNovoCliente({ nome: '', cpf: '', telefone: '', email: '', restaurante: { id: 1 } });
      })
      .catch(error => console.error('Erro ao adicionar cliente:', error));
  };

  return (
    <div>
      <h2>Adicionar Cliente</h2>
      <form>
        <input
          type="text"
          placeholder="Nome"
          value={novoCliente.nome}
          onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="CPF"
          value={novoCliente.cpf}
          onChange={(e) => setNovoCliente({ ...novoCliente, cpf: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={novoCliente.telefone}
          onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={novoCliente.email}
          onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
        />
        <button type="button" onClick={handleAddCliente}>Salvar</button>
      </form>

      <h3>Lista de Clientes</h3>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome} - {cliente.cpf}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteForm;
