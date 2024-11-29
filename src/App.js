import logo from './logo.svg';
import './App.css';
import RestauranteList from './RestauranteList';
import ClienteList from './ClienteList';
import MesasList from './MesasList';


function App() {
  return (
    <div className="App">
      <RestauranteList />
      <ClienteList />
      <MesasList />
    </div>
  );
}

export default App;
