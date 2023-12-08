import { useCallback, useState } from "react";
import { Chess,  } from 'chess.js'
import { Chessboard } from "react-chessboard";
import './ChessGame.css';
import { Arrow, Piece, Square } from "react-chessboard/dist/chessboard/types";

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
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });

    // illegal move
    if (move === null) return false;

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

  const lastMove = game.history({ verbose: true }).at(-1)
  const arrows: Arrow[] = []
  if (lastMove) {
    arrows.push([lastMove?.from, lastMove?.to, 'red'])
  }

  return (
    <div className="chess-board-container">
      <div className="board-title">CHESS BOARD</div>
      <div className="load-pgn-section">
        <div className="form-field">
          <span className="form-field-label">Initial PGN:</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <textarea placeholder="Eg. 1. d3 e6 2. Qd2 Qg5" rows={4} cols={30} className="form-field-input" value={loadBoardVal} onChange={(e) => setLoadBoardVal(e.target.value)} />
            <button style={{ marginLeft: '1rem' }} onClick={handleLoadBoardFromMoveList}>Load board from PGN</button>
          </div>
        </div>
      </div>
      <div className="players-turn-indicator">{game.turn() === 'b' ? '⚫ Black' : '⚪ White'}'s turn</div>
      <div className="board-container">
        <Chessboard
          id="game"
          position={game.fen()}
          onPieceDrop={onDrop}
          customArrows={arrows}
        />
      </div>
      <div className="chess-buttons">
        <button onClick={handleReset}>reset</button>
        <button onClick={handleUndo}>undo</button>
      </div>
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
