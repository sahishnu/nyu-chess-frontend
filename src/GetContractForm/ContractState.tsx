import { formatUnits } from "ethers";

export interface IContractState {
  player1: string;
  player2: string;
  wagerAmount: string;
  timeout: string;
  gameState: {
    seq: number;
    board: string;
    currentTurn: string;
    gameOver: boolean;
  };
  timeoutInterval: string;
  balance: string;
}

export interface IContractStateProps {
  contractAddress?: string;
  contractState: IContractState | null;
  error: string;
}

export const ContractState = ({ contractAddress, contractState, error }: IContractStateProps) => {

  if (!contractState && !error) {
    return null;
  }

  return (
    <div className="encoded-output-container">
      <code>
        {contractAddress ? (
          <>
          Contract Address: {contractAddress}
          <br/>--<br/>
          </>
        ) : null}
        {error ? (
          <>{error}<br/><br/></>
        ) : null}
        {contractState ? (
          <>          
          Player 1: {contractState?.player1}
          <br/>--<br/>
          Player 2: {contractState?.player2}
          <br/>--<br/>
          Wager: {contractState?.wagerAmount}
          <br/>--<br/>
          Timeout Interval: {contractState?.timeoutInterval}
          <br/>--<br/>
          Timeout: {contractState?.timeout}
          <br/>--<br/>
          Game::Seq: {formatUnits(contractState?.gameState?.seq || 0)}
          <br/>--<br/>
          Game::Board: {contractState?.gameState?.board || '""'}
          <br/>--<br/>
          Game::Turn: {contractState?.gameState?.currentTurn}
          <br/>--<br/>
          Game::Game Over: {contractState?.gameState?.gameOver ? 'true' : 'false'}
          <br/>--<br/>
          Contract Balance: {contractState.balance}
          </>
        ) : null}
      </code>
    </div>
  )
}