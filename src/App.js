import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="src-button">
      <a className="btn btn-large btn-success mb-5" href="https://github.com/benjaminJohnson2204/wordle-site" rel="noopener noreferrer" target="_blank">
            View Source Code
        </a>
        </div>
        <div className="header-text">
          Ben's Wordle Game
        </div>
        <Game/>
      </header>
    </div>
  );
}

export default App;
