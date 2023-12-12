import { Contract } from "ethers";
import { JsonRpcSigner } from "ethers";
import { useState } from "react"
import leaderboardAbi from '../assets/leaderboard-abi.json';

interface ILeaderboardProps {
  signer: JsonRpcSigner;
}

interface ILeaderboardData {
  address: string;
  wins: string;
  losses: string;
}

export const Leaderboard = ({ signer }: ILeaderboardProps) => {

  const [contractAddress, setContractAddress] = useState('');
  const [leaderboard, setLeaderboard] = useState<ILeaderboardData[]>([]);

  const handleClickFetchLeaderboard = async () => {
    try {
      const contractInstance = new Contract(contractAddress, leaderboardAbi, signer);
      console.log(contractInstance)
      const [lbAddresses, lbStats] = await contractInstance.getLeaderboard();
      const data: ILeaderboardData[] = lbAddresses.map((adx: string, idx: number) => {
        return ({
          address: adx,
          wins: lbStats?.[idx]?.[0]?.toString(),
          losses: lbStats?.[idx]?.[1]?.toString()
        })
      });

      console.log(data)
      setLeaderboard(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="encode-message-form">
      <div className="form-title">LEADERBOARD</div>
      <div className="form-field">
        <span className="form-field-label">Contract Address</span>
        <input placeholder="Ex. 0xe123...789" className="form-field-input" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
      </div>
      <button onClick={handleClickFetchLeaderboard} className="form-submit-button">Fetch Leaderboard</button>
      {leaderboard.length ? (
        <div className="encoded-output-container">
          <code>
            <>
              Leaderboard Address: {contractAddress}
              <br/>--<br/>
              {leaderboard.map(standing => {
                  return (<>
                    Player: {standing.address} -- W: {standing.wins} -- L: {standing.losses}
                    <br/>--<br/>
                  </>)
                })}   
            </>
          </code>
        </div>
      ) : null}
    </div>
  )  
}