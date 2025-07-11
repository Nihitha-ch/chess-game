import React, {useState, useRef, useEffect, useContext} from 'react';
import Chess from 'chess.js';
import {createBoard} from '../../functions/index.js';
import Board from '../../components/board/index.jsx';
import { GameContext } from '../../context/GameContext.js';
import { types } from '../../context/actions.js';
import getGameOverState from '../../functions/game-over.js';
import GameOver from '../../components/gameover/index.jsx';
import io from 'socket.io-client';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';

const socket = io('localhost:5000');
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const Game = ()=> {
    const [fen, setFen] = useState(FEN);
    const {current: chess}= useRef (new Chess(fen));
    const [board, setBoard] = useState(createBoard(fen));
    const { dispatch, gameOver } = useContext(GameContext);
    
    const location = useLocation();
	  const history = useHistory();
	  const playerName = useRef();
	  const gameID = useRef();

    useEffect(()=> {
        setBoard(createBoard(fen));
    },[fen]);
    
    useEffect(() => {
		  const { id, name } = qs.parse(location.search);
		  playerName.current = name;
		  gameID.current = id;
	  }, [location.search]);

    useEffect(() => {
		socket.emit('join',
       { name: playerName.current, gameID: gameID.current  },
       ({ error, color }) => {
          if (error) {
				  history.push('/');
			}
			console.log({ color });
		});
		socket.on('welcome', ({ message, opponent }) => {
			console.log({ message, opponent });
		});
		socket.on('opponentJoin', ({ message, opponent }) => {
			console.log({ message, opponent });
		});

		socket.on('opponentMove', ({ from, to }) => {
			chess.move({ from, to });
			setFen(chess.fen());
		});
		socket.on('message', ({ message }) => {
			console.log({ message });
		});
	}, [chess, history]);


    useEffect(() => {
      const [gameOver, status] = getGameOverState(chess);
        if (gameOver) {
            dispatch({ type: types.GAME_OVER, status, player: chess.turn() });
            return;
        }
    dispatch({
        type: types.SET_TURN, 
        player: chess.turn(),
        check: chess.in_check(),
    });
}, [fen, dispatch, chess]);

    const fromPos = useRef();

    const makeMove = (pos) => {
        const from = fromPos.current;
        const to = pos;
        chess.move({ from, to});
        dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
        setFen(chess.fen());
        socket.emit('move', { gameID: gameID.current, from, to: pos });
    };

    const setFromPos = (pos) => {
      fromPos.current = pos;
      dispatch({
        type: types.SET_POSSIBLE_MOVES,
        moves: chess.moves({ square: pos }),
    });
  };
  if (gameOver) {
		return <GameOver />;
	}
    return (
      <div className="game">
        <Board cells={board} makeMove={makeMove} setFromPos={setFromPos}/> 
      </div>
    );
  
};

export default Game;