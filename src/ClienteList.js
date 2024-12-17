import React, { useState, useEffect } from 'react';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);  // Inicializa como um array vazio

  useEffect(() => {
    // Requisição para buscar clientes
    fetch('http://localhost:8080/cliente')
      .then(response => response.json())
      .then(data => {
        // Verifica se a resposta da API é um array
        if (Array.isArray(data)) {
          setClientes(data);  // Atualiza o estado apenas se for um array
        } else {
          console.error('Erro: dados recebidos não são um array');
          setClientes([]);  // Caso não seja um array, limpa o estado
        }
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
        setClientes([]);  // Caso haja erro na requisição, limpa o estado
      });
  }, []);  // O useEffect roda apenas uma vez, quando o componente é montado

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clientes && Array.isArray(clientes) && clientes.length > 0 ? (
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.id}>
              {cliente.nome} - {cliente.cpf} - {cliente.telefone} - {cliente.email} - {cliente.restauranteCliente}
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há clientes disponíveis.</p>  // Exibe quando não houver clientes
      )}
    </div>
  );
};

export default ClienteList;
// 12/01/2024 18:23