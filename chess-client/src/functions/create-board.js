export class Cell{
    constructor(pos, piece){
        this.pos= pos;
        this.piece = piece;
    }
}

//returns array of range 1 to n
const range = (n) =>{
    return Array.from({length: n}, (_, i)=> i+1);
};

export const createBoard = (fenString)=> {
   const fen = fenString.split('  ')[0]; //get the first portion of string
   const fenPieces = fen.split('/').join(''); //convert FEN into one long continuous string
   let pieces = Array.from(fenPieces);
   //save individual pieces for each of 64 cells
   Array.from(fenPieces).forEach((item, index)=>{
    if (isFinite(item)){
        pieces.splice(index, 1, range(item).fill(''));
    }
   });
   pieces= pieces.flat();
   const rows= range(8)
      .map((n)=>n.toString())
      .reverse(); //["8", "7", "6", "5", "4", "3", "2", "1"]
    const columns = ['a','b','c','d','e','f','g','h'];
    const cells = []; //[a1, b1, ..., h8]
    for (let i=0; i< rows.length; i++){
        const row= rows[i];
        for (let j=0; j< columns.length; j++){
            const col = columns[j];
            cells.push(col+row); //eg: a1, b1, c1...
        }      
    }
    const board =[];
    for(let i=0; i< cells.length; i++){
        const cell = cells[i];
        const piece = pieces[i];
        board.push(new Cell(cell, piece));
    }
    return board;
};

console.log(
    createBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
);

