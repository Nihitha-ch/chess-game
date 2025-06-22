import React from 'react';
import PropTypes from 'prop-types';
import './piece-styles.css';

const Piece = ({ name, pos }) => {
    const color = name === name.toUpperCase() ? 'w' : 'b';
    const imageName = color + name.toUpperCase();
    let image;

    try {
        image = require(`../../assets/pieces/${imageName}.png`);
    } catch (error) {
        image = require('../../assets/pieces/empty.png'); //an empty fallback image
    }

    return (
        <img
            className="piece"
            src={image}
            alt=""
            draggable={true}
        />
    );
};

Piece.prototype = {
    name: PropTypes.string.isRequired,
    pos: PropTypes.string.isRequired,
};
export default Piece;