import { useCallback, useState } from "react"
import ABIJson from '../assets/abi.json';
import './GetContractForm.css';
import { ethers, formatEther, formatUnits } from "ethers";

interface IContractState {
  player1: string;
  player2: string;
  wagerAmount: string;
  gameState: {
    seq: number;
    board: string;
    currentTurn: string;
    gameOver: boolean;
  };
  timeoutInterval: string;
}

interface IGetContractFormProps {
  provider: ethers.BrowserProvider;
}

export const GetContractForm = ({ provider }: IGetContractFormProps) => {
  const [contractAddressVal, setContractAddressVal] = useState('');
  const [contractVal, setContractVal] = useState<ethers.Contract | null>(null)

  const [contractValues, setContractValues] = useState<IContractState | null>(null);

  const handleClickJoin = useCallback(async () => {
    const contract = new ethers.Contract(contractAddressVal, ABIJson, provider);

    if (contract) {
      setContractVal(contract);
      const player1 = await contract.player1()
      const player2 = await contract.player2()
      const wagerAmount = await contract.wagerAmount()
      const gameState = await contract.state()
      const timeoutInterval = await contract.timeoutInterval();

      setContractValues({
        player1,
        player2,
        wagerAmount: formatEther(wagerAmount),
        gameState,
        timeoutInterval: formatUnits(timeoutInterval)
      });
    }
  }, [contractAddressVal, provider]);

  console.log(contractValues)

  return (
    <div className="join-game-form">
      <div className="form-title">GET EXISTING GAME CONTRACT</div>
      <div className="form-field">
        <span className="form-field-label">Contract Address</span>
        <input className="form-field-input" value={contractAddressVal} onChange={(e) => setContractAddressVal(e.target.value)} />
      </div>
      <button onClick={handleClickJoin} disabled={!contractAddressVal} className="form-submit-button">Get Contract</button>
      {
        contractVal ? (
          <div className="encoded-output-container">
            <code>
              Player 1: {contractValues?.player1}
              <br/>--<br/>
              Player 2: {contractValues?.player2}
              <br/>--<br/>
              Wager: {contractValues?.wagerAmount}
              <br/>--<br/>
              Timeout Interval: {contractValues?.timeoutInterval}
              <br/>--<br/>
              Game::Seq: {contractValues?.gameState?.seq}
              <br/>--<br/>
              Game::Board: {contractValues?.gameState?.board}
              <br/>--<br/>
              Game::Turn: {contractValues?.gameState?.currentTurn}
              <br/>--<br/>
              Game::Game Over: {contractValues?.gameState?.gameOver}
            </code>
          </div>
        ) : null
      }
    </div>
  )
}