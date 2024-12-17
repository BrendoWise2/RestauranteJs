import React, { useState, useEffect } from 'react';

const ClienteView = () => {
  const [clientes, setClientes] = useState([]); // Inicializa como um array vazio

  useEffect(() => {
    // Fazendo a requisição para a API
    fetch('http://localhost:8080/cliente')
      .then((response) => response.json())
      .then((data) => {
        // Verifica se o retorno da API é um array
        if (Array.isArray(data)) {
          setClientes(data); // Atualiza o estado apenas se for um array
        } else {
          console.error('Erro: dados recebidos não são um array', data);
          setClientes([]); // Garante que o estado seja um array vazio em caso de erro
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
        setClientes([]); // Garante que o estado seja um array vazio em caso de erro na requisição
      });
  }, []); // Esse useEffect é chamado apenas uma vez, quando o componente é montado

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clientes && Array.isArray(clientes) && clientes.length > 0 ? (
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id}>
              {cliente.nome} - {cliente.email} - {cliente.telefone}
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há clientes disponíveis.</p>
      )}
    </div>
  );
};

export default ClienteView;
