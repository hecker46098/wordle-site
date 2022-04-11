import './App.css';
import Boxes from './Boxes';
import Game from './Game';
import Keys from './Keys';

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
