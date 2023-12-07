import { useEffect, useState } from 'react'
import Web3 from 'web3'
import ethLogo from './assets/eth_logo.png'
import './App.css'
import { ChessGame } from './ChessGame';
import { decodeMessage } from './utils';

interface IDecodedMessage {
  recipient: string;
  boardState: string;
  nonce: number;
  contractAddress: string;
}

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [activeAccount, setActiveAccount] = useState('');
  const [decodeVal, setDecodeVal] = useState('');
  const [decodedMessage, setDecodedMessage] = useState<IDecodedMessage | null>();
  const [joinGameInputVal, setJoinGameInputVal] = useState('')

  // Loads the available user eth accounts when page loads.
  useEffect(() => {
    const loadData = async () => {
      if (window.ethereum) {

        const web3network = new Web3(Web3.givenProvider || "http://localhost:8545")
        const accounts = await web3network.eth.getAccounts()

        setWeb3(web3network)
        setActiveAccount(accounts[0])
      } else {
        console.log("Ethereum wallet not found");
      }
    }

    loadData()
  }, [])
  
  if (!web3) {
    return <div>Please connect to ethereum</div>
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <img src={ethLogo} className="logo" alt="Vite logo" />
          <h2>Ethereum Chess</h2>
        </div>
        <div className="header-right">
          <code>{activeAccount}</code>
        </div>
      </header>
      <div className="layout">
        <div className="card join-start-game">
          <button>Start a game</button>
          or
          <div>
            <input value={joinGameInputVal} onChange={(e) => setJoinGameInputVal(e.target.value)} />
            <button onClick={() => console.log(joinGameInputVal)}>Join a game</button>
          </div>
        </div>
        <div className="card">
          <ChessGame activeAccount={activeAccount} web3={web3} />
        </div>
        <div className="card">
          <textarea onChange={(e) => setDecodeVal(e.target.value)} />
          <button onClick={() => {
            const m = decodeMessage(decodeVal)
            const [recipient, boardState, nonce, contractAddress] = m;

            setDecodedMessage({ recipient, boardState, nonce, contractAddress });
            
          }}>Decode</button>
          {decodedMessage ? <div className='decoded-message-data'>
            <p>Recipient: <code>{decodedMessage.recipient}</code></p>
            <p>Board State: <code>{decodedMessage.boardState}</code></p>
            <p>Nonce: <code>{decodedMessage.nonce}</code></p>
            <p>Contract Address: <code>{decodedMessage.contractAddress}</code></p>
          </div> : null}
        </div>
      </div>
    </div>
  )
}

export default App
