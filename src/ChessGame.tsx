import { useCallback, useState } from "react";
import { Chess } from 'chess.js'
import { Chessboard } from "react-chessboard";

export const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  const makeMove = useCallback((move) => {
    const m = game.move(move);
    console.log(m)
    setGame(new Chess(game.fen()))
  }, [game])

  const makeRandomMove = () => {
    const possibleMoves = game.moves();

    // exit if the game is over
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeMove(possibleMoves[randomIndex])
  }

  const onDrop = (sourceSquare, targetSquare, piece) => {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });

    // illegal move
    if (move === null) return false;

    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    const newTimeout = setTimeout(makeRandomMove, 200);
    setCurrentTimeout(newTimeout);
    return true;
  }

  const handleUndo = useCallback(() => {
    const undo = game.undo()
    console.log(undo)
    if (undo) {
      makeMove(undo)
      clearTimeout(currentTimeout);
    }
  }, [currentTimeout, game, makeMove]);

  const handleReset = useCallback(() => {
    setGame(new Chess());
    clearTimeout(currentTimeout);
  }, [currentTimeout]);

  return (
    <div>
      <Chessboard id="game" position={game.fen()} onPieceDrop={onDrop} />
      <button
          onClick={handleReset}
        >
          reset
        </button>
        <button
          onClick={handleUndo}
        >
          undo
        </button>
    </div>
  )
}
