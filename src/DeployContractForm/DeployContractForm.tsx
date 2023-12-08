import { useCallback, useState } from "react"
import { ContractFactory, formatUnits, parseEther } from "ethers";
import { BYTE_CODE } from "../assets/byteCode";
import ABIJson from '../assets/abi.json';
import { JsonRpcSigner } from "ethers";
import { ContractTransactionReceipt } from "ethers";

interface IDeployContractFormProps {
  signer: JsonRpcSigner;
}

export const DeployContractForm = ({ signer }: IDeployContractFormProps) => {
  const [timerInterval, setTimerInterval] = useState('');
  const [wagerAmount, setWagerAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txReceipt, setTxReceipt] = useState<ContractTransactionReceipt | null | undefined>(null);

  const handleClickStart = useCallback(async () => {
    try {
      setIsLoading(true);
      const factory = new ContractFactory(ABIJson, BYTE_CODE, signer);
      const contract = await factory.deploy(timerInterval, { value: parseEther(wagerAmount) })
      const tx = await contract.deploymentTransaction()?.wait()
      console.log(tx)
      setTxReceipt(tx);
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [wagerAmount, signer, timerInterval]);

  return (
    <div className="encode-message-form">
      <div className="form-title">DEPLOY A NEW GAME</div>
      <div className="form-field">
        <span className="form-field-label">Timeout Interval</span>
        <input placeholder="Eg. 60" className="form-field-input" value={timerInterval} onChange={(e) => setTimerInterval(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Wager Amount (in ETH)</span>
        <input placeholder="Eg. 0.001" className="form-field-input" value={wagerAmount} onChange={(e) => setWagerAmount(e.target.value)} />
      </div>
      <button onClick={handleClickStart} disabled={!timerInterval && !wagerAmount} className="form-submit-button">Deploy new game</button>
      {
        txReceipt ? (
          <div className="encoded-output-container">
            <code>
              Contract Address: {txReceipt.contractAddress}
              <br/>--<br/>
              Block Hash: {txReceipt.blockHash}
              <br/>--<br/>
              Block Number: {txReceipt.blockNumber}
              <br/>--<br/>
              Gas Used: {formatUnits(txReceipt.gasUsed)}
            </code>
          </div>
        ) : null
      }
    </div>
  )
}