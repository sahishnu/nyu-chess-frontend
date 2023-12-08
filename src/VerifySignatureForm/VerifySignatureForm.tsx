import { useCallback, useEffect, useState } from "react"
import './VerifySignatureForm.css'
import '../EncodeMessageForm/EncodeMessageForm.css';
import { IVerification, verifyMessage } from "../utils";

export const DecodeMessageForm = () => {
  const [signedMessage, setSignedMessage] = useState('');
  const [signerAddress, setSignerAddress] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [pgnString, setPgnString] = useState('');
  const [sequenceNumber, setSequenceNumber] = useState('');
  const [gameContractAddress, setGameContractAddress] = useState('');

  const [verification, setVerification] = useState<IVerification | null>(null);

  const handleClickVerify = useCallback(() => {
    const verification = verifyMessage(receiverAddress, pgnString, parseInt(sequenceNumber), gameContractAddress, signedMessage, signerAddress);
    setVerification(verification);
  }, [receiverAddress, signerAddress, pgnString, sequenceNumber, gameContractAddress, signedMessage]);

  // Paste the copied statement into the form.
  const handleClickPaste = useCallback(async () => {
    const clipboard = await navigator.clipboard.readText()
    const splitClipboard = clipboard.split('\n--\n')
    splitClipboard.forEach(line => {
      const [key, value] = line.split(": ");
      if (key === 'Signed Message') {
        setSignedMessage(value)
      }
      if (key === 'Signer Public Addr.') {
        setSignerAddress(value)
      }
      if (key === 'Receiver Public Addr.') {
        setReceiverAddress(value)
      }
      if (key === 'Game PGN') {
        setPgnString(value)
      }
      if (key === 'Sequence Number') {
        setSequenceNumber(value)
      }
      if (key === 'Game Contract Addr.') {
        setGameContractAddress(value)
      }
    })
  }, [])

  // Clear all form fields if user clicks clear.
  const handleClickClear = useCallback(() => {
    setSignedMessage('')
    setSignerAddress('')
    setReceiverAddress('')
    setPgnString('')
    setSequenceNumber('')
    setGameContractAddress('')
    setVerification(null)
  }, [])

  // Clear recovered address if any fields change value.
  useEffect(() => {
    setVerification(null)
  }, [signedMessage, signerAddress, receiverAddress, pgnString, sequenceNumber, gameContractAddress])

  const isAllFieldsFilled = signedMessage && signerAddress && receiverAddress && pgnString && sequenceNumber && gameContractAddress;

  return (
    <div className="decode-message-form">
      <div className="decode-form-top-row">
        <div className="form-title">VERIFY MESSAGE FORM</div>
        <div>
          <button onClick={handleClickClear} className="encoded-output-copy">CLEAR</button>
          <button onClick={handleClickPaste} className="encoded-output-copy">PASTE</button>
        </div>
      </div>
      <div className="form-field">
        <span className="form-field-label">Signed Message</span>
        <textarea placeholder="Signed message from opponent" rows={4} className="form-field-input" value={signedMessage} onChange={(e) => setSignedMessage(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Signer Public Addr.</span>
        <textarea placeholder="Opponents public address" className="form-field-input" value={signerAddress} onChange={(e) => setSignerAddress(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Receiver Public Address</span>
        <input placeholder="Your public address" className="form-field-input" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Game PGN String</span>
        <textarea placeholder="ex. 1. e3 e6" className="form-field-input" value={pgnString} onChange={(e) => setPgnString(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Sequence Number</span>
        <input placeholder="Ex. 5" className="form-field-input" value={sequenceNumber} onChange={(e) => setSequenceNumber(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Game Contract Address</span>
        <input placeholder="Game Address" className="form-field-input" value={gameContractAddress} onChange={(e) => setGameContractAddress(e.target.value)} />
      </div>
      <button onClick={handleClickVerify} disabled={!isAllFieldsFilled} className="form-submit-button">Recover signer & verify</button>
      {
        verification ? (
          <div className="encoded-output-container">
            <code>
              {verification.isMatch ? 'VERIFIED ✅✅✅' : 'ERROR ❌❌❌'}
              <br />--<br />
              Recovered Address: {verification.recoveredAddress}
              <br />--<br />
              Expected Address: {verification.expectedAddress}
            </code>
          </div>
        ) : null
      }
    </div>
  )
}