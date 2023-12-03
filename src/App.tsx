import { useEffect, useState } from 'react'
import Web3 from 'web3'
import ethLogo from './assets/eth_logo.png'
import './App.css'
import { ChessGame } from './ChessGame';

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);

  // Loads the available user eth accounts when page loads.
  useEffect(() => {
    const loadData = async () => {
      if (window.ethereum) {

        const web3network = new Web3(Web3.givenProvider || "http://localhost:8545")
        const accounts = await web3network.eth.getAccounts()

        console.log(web3network);
        console.log(accounts);
        setWeb3(web3network)
        setAccounts(accounts)
      } else {
        console.log("Ethereum wallet not found");
      }
    }

    loadData()
  }, [])

  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={ethLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Ethereum Chess</h1>
      <div className="card">
        <p>
          Number of accounts: <code>{accounts.length}</code>
        </p>
        <ChessGame />
      </div>
    </>
  )
}

export default App
