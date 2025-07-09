import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
import { GameProvider } from './context/GameContext';
import { startTransition } from 'react';
function App() {
    return (
        <Router>
            <GameProvider>
                <Route path="/" exact component={Home} />
                <Route path="/game" component={Game} />
            </GameProvider>
        </Router>
    );
}

export default App;
