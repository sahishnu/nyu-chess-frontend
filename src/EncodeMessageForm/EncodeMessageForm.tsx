import { useCallback, useState } from "react";
import './EncodeMessageForm.css';
import { constructMessage, signMessage } from "../utils";
import { JsonRpcSigner } from "ethers";

interface IEncodeMessageFormProps {
  signer: JsonRpcSigner
}

export const EncodeMessageForm = ({ signer}: IEncodeMessageFormProps) => {
  const [signingAddress, setSigningAddress] = useState(signer?.address || '');
  const [opponentAddress, setOpponentAddress] = useState('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  const [pgnString, setPgnString] = useState('1. e3');
  const [sequenceNumber, setSequenceNumber] = useState('1');
  const [gameContractAddress, setGameContractAddress] = useState('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  const [encodedOutput, setEncodedOutput] = useState('');

  const handleClickEncode = useCallback(async () => {
    const message = constructMessage(opponentAddress.trim(), pgnString.trim(), parseInt(sequenceNumber), gameContractAddress.trim());
    const signedMessage = await signMessage(message, signer)
    setEncodedOutput(signedMessage);
  }, [opponentAddress, pgnString, sequenceNumber, gameContractAddress, signer])

  const handleClickCopy = useCallback(() => {
    const copyValue = [`Signed Message: ${encodedOutput}`,
    `Signer Public Addr.: ${signer.address}`,
    `Receiver Public Addr.: ${opponentAddress}`,
    `Game PGN: ${pgnString}`,
    `Sequence Number: ${sequenceNumber}`,
    `Game Contract Addr.: ${gameContractAddress}`];

    navigator.clipboard.writeText(copyValue.join('\n--\n'))
  }, [opponentAddress, pgnString, sequenceNumber, gameContractAddress, signer, encodedOutput])

  const isAllFieldsFilled = opponentAddress && pgnString && sequenceNumber && gameContractAddress;

  return (
    <div className="encode-message-form">
      <div className="form-title">ENCODE MESSAGE FORM</div>
      <div className="form-field">
        <span className="form-field-label">Signer Public Addr. (Your public addr.)</span>
        <input className="form-field-input" value={signingAddress} onChange={(e) => setSigningAddress(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Opponent Public Address</span>
        <input className="form-field-input" value={opponentAddress} onChange={(e) => setOpponentAddress(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Game PGN String</span>
        <textarea className="form-field-input" value={pgnString} onChange={(e) => setPgnString(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Sequence Number</span>
        <input className="form-field-input" value={sequenceNumber} onChange={(e) => setSequenceNumber(e.target.value)} />
      </div>
      <div className="form-field">
        <span className="form-field-label">Game Contract Address</span>
        <input className="form-field-input" value={gameContractAddress} onChange={(e) => setGameContractAddress(e.target.value)} />
      </div>
      <button onClick={handleClickEncode} disabled={!isAllFieldsFilled} className="form-submit-button">Encode & Sign message</button>
      {
        encodedOutput ? (
          <div className="encoded-output-container">
            <code>
              <div>
                <button onClick={handleClickCopy} className="encoded-output-copy">COPY</button>
              </div>
              Signed Message: {encodedOutput}
              <br />--<br />
              Signer Public Addr.: {signer.address}
              <br />--<br />
              Receiver Public Addr.: {opponentAddress}
              <br />--<br />
              Game PGN: {pgnString}
              <br />--<br />
              Sequence Number: {sequenceNumber}
              <br />--<br />
              Game Contract Addr.: {gameContractAddress}
            </code>
          </div>
        ) : null
      }
    </div>
  )
}