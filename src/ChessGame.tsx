import { useCallback, useState } from "react";
import { Chess } from 'chess.js'
import { Chessboard } from "react-chessboard";
import { constructMessage, signMessage } from "./utils";
import './ChessGame.css';
import Web3 from "web3";
interface IChessGameProps {
  activeAccount?: string;
  web3: Web3;
}

export const ChessGame = ({ activeAccount = '', web3 }: IChessGameProps) => {
  const [game, setGame] = useState(new Chess());
  const [message, setMessage] = useState('')

  const makeMove = useCallback((move) => {
    game.move(move);
    setGame(new Chess(game.fen()))
  }, [game])


  const onDrop = (sourceSquare, targetSquare, piece) => {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });

    // illegal move
    if (move === null) return false;

    const m = constructMessage(activeAccount, game.fen(), 1, activeAccount);
    setMessage(m)
    signMessage(m, activeAccount, web3);
    return true;
  }

  const handleUndo = useCallback(() => {
    const undo = game.undo()
    console.log(undo)
    if (undo) {
      makeMove(undo)
    }
  }, [game, makeMove]);

  const handleReset = useCallback(() => {
    setGame(new Chess());
  }, []);

  return (
    <div>
      <Chessboard id="game" position={game.fen()} onPieceDrop={onDrop} />
      <button onClick={handleReset}>reset</button>
      <button onClick={handleUndo}>undo</button>
      <p className="message-container">
        <code>{message}</code>
      </p>
    </div>
  )
}
