/**
 *
 * @param {*} chess An instance of the current Chess object
 * @returns {[boolean, string]}
 */
export const getGameOverState = (chess) => {
    if (!chess.game_over()) {
        return [false, ''];
    }
    if (chess.in_checkmate()) {
        return [true, 'checkmate'];
    }

    if (chess.in_stalemate()) {
        return [true, 'stalemate'];
    }
    if (chess.in_threefold_repetition()) {
        return [true, 'three fold repetition'];
    }
    if (chess.in_draw()) {
        return [true, 'draw'];
    }
};
export default getGameOverState;