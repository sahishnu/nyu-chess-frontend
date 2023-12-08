import { useCallback, useEffect, useState } from "react"
import ABIJson from '../assets/abi.json';
import './GetContractForm.css';
import { ethers, formatEther, formatUnits, parseEther } from "ethers";
import { ContractState, IContractState } from "./ContractState";
import { ContractActions } from "./ContractActions";
import { JsonRpcSigner } from "ethers";

interface IGetContractFormProps {
  provider: ethers.BrowserProvider;
  signer: JsonRpcSigner;
}

export const GetContractForm = ({ provider, signer }: IGetContractFormProps) => {
  const [contractAddressVal, setContractAddressVal] = useState('');
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [contractState, setContractState] = useState<IContractState | null>(null);
  const [error, setError] = useState('');

  const fetchContractState = useCallback(async () => {
    if (contract) {
      try {
        const player1 = await contract.player1()
        const player2 = await contract.player2()
        const wagerAmount = await contract.wagerAmount()
        const gameState = await contract.state()
        const timeoutInterval = await contract.timeoutInterval();
        const timeout = await contract.timeout();
        const balance = await provider.getBalance(contractAddressVal);
        setContractState({
          player1,
          player2,
          wagerAmount: formatEther(wagerAmount),
          gameState,
          timeoutInterval: formatUnits(timeoutInterval),
          timeout: formatUnits(timeout),
          balance: formatEther(balance)
        });
      } catch (e) {
        console.error(e)
        setError(e?.message)
      }
    }
  }, [contract, contractAddressVal, provider])

  const handleClickFetchContract = useCallback(async () => {
    try {
      const contractInstance = new ethers.Contract(contractAddressVal, ABIJson, signer);
      setContract(contractInstance);
      fetchContractState();
      setError('');
    } catch (e) {
      console.error(e)
      setError(e?.message);
      setContract(null);
      setContractState(null)
    }
  }, [contractAddressVal, fetchContractState, signer]);

  useEffect(() => {
    if (contract) {
      fetchContractState()
    }
  }, [contract, fetchContractState])

  const handleClickJoinGame = useCallback(async (wagerAmount: string) => {
    if (contract) {
      try {
        const receipt = await contract.join({ value: parseEther(wagerAmount) });
        console.log(receipt)
      } catch (e) {
        console.error(e)
      }
    }
  }, [contract]);

  const handleClickCancelGame = useCallback(async () => {
    if (contract) {
      try {
        const receipt = await contract.cancel();
        console.log(receipt)
      } catch (e) {
        console.error(e)
      }
    }
  }, [contract])

  const handleClickMakeMove = useCallback(async (seqNumber: string, moveList: string) => {
    if (contract) {
      try {
        const receipt = await contract.move(parseInt(seqNumber), moveList);
        console.log(receipt)
      } catch (e) {
        console.error(e)
      }
    }
  }, [contract])

  return (
    <div className="join-game-form">
      <div className="form-title">GET EXISTING GAME CONTRACT</div>
      <div className="form-field">
        <span className="form-field-label">Contract Address</span>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <textarea className="form-field-input" value={contractAddressVal} placeholder="Ex. 0xe123...789" onChange={(e) => setContractAddressVal(e.target.value)} />
          <button onClick={handleClickFetchContract} className="form-submit-button get-contract-btn">Get Contract</button>
        </div>
      </div>
      <ContractState contractState={contractState} contractAddress={contractAddressVal} error={error} />
      {contractState ? <ContractActions onClickJoin={handleClickJoinGame} onClickCancel={handleClickCancelGame} onClickMakeMove={handleClickMakeMove} /> : null}
    </div>
  )
}