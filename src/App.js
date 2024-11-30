import logo from './logo.svg';
import './App.css';
import RestauranteList from './RestauranteList';
import ClienteView from './ClienteView'; 
import MesasView from './MesasView';
import Notificaçao from './Notificaçao';

function App() {
  return (
    <div className="App">
      <RestauranteList />
      <ClienteView />
      <MesasView />
      <Notificaçao />
    </div>
  );
}

export default App;
