import logo from './logo.svg';
import './App.css';
import RestauranteList from './RestauranteList';
import ClienteView from './ClienteView'; // Keep the relevant import

function App() {
  return (
    <div className="App">
      <RestauranteList />
      <ClienteView/>
    </div>
  );
}

export default App;
