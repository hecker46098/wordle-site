import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-text">
          Ben's Wordle Game
        </div>
        <Game/>
      </header>
    </div>
  );
}

export default App;
