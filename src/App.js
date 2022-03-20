import logo from './coin.png';
import './App.css';
import {CoinList} from "./components/CoinList.js"

function App() {


  return (

    <div className="App">
      <header className="App-header">
        <div className='top'>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Coin List</h1>
        </div>
        
        <CoinList />
      </header>
    </div>
  );
}

export default App;