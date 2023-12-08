import { useState } from "react"

interface IContractActionsProps {
  onClickJoin: (wagerAmount: string) => void
  onClickCancel: () => void;
  onClickMakeMove: (seqNum: string, moveList: string) => void;
}
export const ContractActions = ({ onClickJoin, onClickCancel, onClickMakeMove }: IContractActionsProps) => {
  const [wagerAmount, setWagerAmount] = useState('');
  const [sequenceNumber, setSequenceNumber] = useState('');
  const [pgnString, setPgnString] = useState('');

  return (
    <div className="contract-actions">
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-start' }}>
        <input value={wagerAmount} onChange={(e) => setWagerAmount(e.target.value)} placeholder="Wager Amount (ETH)" />
        <button style={{ marginLeft: '1rem' }} onClick={() => onClickJoin(wagerAmount)}>Join</button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-start' }}>
        <input placeholder="PGN String" value={pgnString} onChange={(e) => setPgnString(e.target.value)} />
        <input placeholder="Sequence #" value={sequenceNumber} onChange={(e) => setSequenceNumber(e.target.value)} />
        <button onClick={() => onClickMakeMove(sequenceNumber, pgnString)}>Make Move</button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-start' }}>
        <button onClick={onClickCancel}>Cancel Game</button>
        <button>End Game</button>
        <button>Start Timer</button>
        <button>Claim Timeout</button>
      </div>
    </div>
  )
}