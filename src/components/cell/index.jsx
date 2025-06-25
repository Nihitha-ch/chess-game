import React from 'react';
import PropTypes from 'prop-types';
import { isLightSquare, Cell as BoardCell } from '../../functions/';
import Piece from '../piece';
import './cell-styles.css';

const Cell = ({ cell, index,  makeMove, setFromPos  }) => {
    const light = isLightSquare(cell.pos, index);

    const handleDrop = () => {
        makeMove(cell.pos);
    };

    return (
        <div className={`cell ${light ? 'light' : 'dark'}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <Piece pos={cell.pos} name={cell.piece} setFromPos={setFromPos} />
        </div>
    );
};

Cell.prototype = {
    cell: PropTypes.instanceOf(BoardCell).isRequired,
    index: PropTypes.number.isRequired,
    makeMove: PropTypes.func,
    setFromPos: PropTypes.func,
};
export default Cell;