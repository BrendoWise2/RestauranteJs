import React, { useState } from 'react'; // Importing React and useState hook

function ClienteForm({ atualizarLista }) {
  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: ''
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envia os dados para o backend usando fetch ou axios
    try {
      const response = await fetch('http://localhost:8080/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        // Atualiza a lista de clientes no componente pai após o cadastro
        atualizarLista();
        // Limpa os campos do formulário após o cadastro
        setCliente({
          nome: '',
          cpf: '',
          telefone: '',
          email: ''
        });
      } else {
        console.error('Erro ao cadastrar o cliente');
      }
    } catch (error) {
      console.error('Erro ao enviar dados', error);
    }
  };

  return (
    <div>
      <h2>Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={cliente.nome}
            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cliente.cpf}
            onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            value={cliente.telefone}
            onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={cliente.email}
            onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ClienteForm;
