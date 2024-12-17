import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import './App.css';
import RestauranteList from './RestauranteList';
import ClienteView from './ClienteView'; 
import MesasView from './MesasView';
import Notificacao from './Notificacao';

function App() {
  const [clientes, setClientes] = useState([]); // Estado para lista de clientes

  // Função para buscar a lista de clientes
  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:8080/clientes');
      const data = await response.json();
      setClientes(data); // Atualiza o estado com a lista de clientes
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  useEffect(() => {
    fetchClientes(); // Chama a função para carregar a lista de clientes ao iniciar o componente
  }, []); // O array vazio [] faz com que a função seja chamada uma vez ao montar o componente

  return (
    <div className="App">
      {/* Passando a lista de clientes como props para os componentes filhos */}
      <RestauranteList />
      <MesasView />
      <Notificacao />
    </div>
  );
}

export default App;
