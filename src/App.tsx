import { useCallback, useEffect, useState } from 'react'
import ethLogo from './assets/eth_logo.png'
import './App.css'
import { ChessGame } from './ChessGame';
import { EncodeMessageForm } from './EncodeMessageForm/EncodeMessageForm';
import { JsonRpcSigner, ethers } from 'ethers';
import { DecodeMessageForm } from './VerifySignatureForm/VerifySignatureForm';
import { GetContractForm } from './GetContractForm/GetContractForm';

function App() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>()

  // Loads the available user eth accounts when page loads.
  useEffect(() => {
    const loadData = async () => {
      if (window.ethereum) {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);
        setProvider(provider);
      } else {
        console.log("Ethereum wallet not found");
      }
    }

    loadData()
  }, [])
  
  if (!signer || !provider) {
    return <div>Please connect to ethereum</div>
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <img src={ethLogo} className="logo" alt="Vite logo" />
          <h2>ETH CHESS</h2>
        </div>
        <div className="header-right">
          <code>{signer?.address}</code>
        </div>
      </header>
      <div className="layout">
        <div className="card join-start-game">
          <button>Start a game</button>
        </div>
        <div className="card">
          <GetContractForm provider={provider} signer={signer} />
        </div>
        <div className="card">
          <ChessGame />
        </div>
        <div className="card">
          <EncodeMessageForm signer={signer}/>
        </div>
        <div className="card">
          <DecodeMessageForm />
        </div>
      </div>
    </div>
  )
}

export default App
