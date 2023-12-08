import { useCallback, useState } from "react";
import { Chess,  } from 'chess.js'
import { Chessboard } from "react-chessboard";
import './ChessGame.css';
import { Piece, Square } from "react-chessboard/dist/chessboard/types";

interface GameMove {
  from: string;
  to: string;
  promotion?: string;
}

export const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [loadBoardVal, setLoadBoardVal] = useState('1. d3 e6 2. Qd2 Qg5 3. Qxg5 Bd6 4. Qf4');
  const [, updateState] = useState({});

  const forceUpdate = useCallback(() => updateState({}), []);

  const makeMove = useCallback((move: GameMove) => {
    return game.move(move);
  }, [game])


  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    const moveNumber = game.moveNumber()
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });

    // illegal move
    if (move === null) return false;

    console.log('Move', move)
    console.log('PGN', game.pgn())
    console.log('Move Number', moveNumber)

    forceUpdate()
    return true;
  }

  const handleUndo = useCallback(() => {
    const undo = game.undo()
    if (undo) {
      forceUpdate();
    }
  }, [game, forceUpdate]);

  const handleReset = useCallback(() => {
    setGame(new Chess());
  }, []);

  const handleLoadBoardFromMoveList = useCallback(() => {
    game.loadPgn(loadBoardVal);
    forceUpdate();
  }, [forceUpdate, game, loadBoardVal]);

  const handleClickCopy = useCallback(() => {
    navigator.clipboard.writeText(game.pgn())
  }, [game])

  return (
    <div>
      <div>
      <input value={loadBoardVal} onChange={(e) => setLoadBoardVal(e.target.value)} />
      <button onClick={handleLoadBoardFromMoveList}>Load board (PGN)</button>
      </div>
      <div>{game.turn() === 'b' ? 'Black' : 'White'}'s' turn</div>
      <Chessboard id="game" position={game.fen()} onPieceDrop={onDrop} />
      <button onClick={handleReset}>reset</button>
      <button onClick={handleUndo}>undo</button>
      <div className="chess-pgn-container">
        <code>
        <div>
          <button onClick={handleClickCopy} className="encoded-output-copy">COPY</button>
        </div>
        Game PGN:
        <br />
        {game.pgn()}
        </code>
      </div>
    </div>
  )
}
