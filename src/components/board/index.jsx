import React from 'react';
import './board-styles.css';
import Cell from '../cell';
import PropTypes from 'prop-types';
const Board = ({cells})=> {
    return (
        <div className="board">
            
            {cells.map((cell, index)=> (
                <Cell cell = {cell} index = {index} key = {cell.pos}  />
            ))}
        </div>
    );
};
Board.prototype = {
    cells: PropTypes.array.isRequired,
};
export default Board;