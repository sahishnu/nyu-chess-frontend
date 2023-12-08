import { useState } from "react"

interface IContractActionsProps {
  onClickJoin: (wagerAmount: string) => void
  onClickCancel: () => void;
}
export const ContractActions = ({ onClickJoin, onClickCancel }: IContractActionsProps) => {
  const [wagerAmount, setWagerAmount] = useState('');

  return (
    <div className="contract-actions">
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-start' }}>
        <input value={wagerAmount} onChange={(e) => setWagerAmount(e.target.value)} placeholder="Wager Amount (ETH)" />
        <button style={{ marginLeft: '1rem' }} onClick={() => onClickJoin(wagerAmount)}>Join</button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-start' }}>
        <input placeholder="PGN String" />
        <input placeholder="Sequence #" />
        <button>Make Move</button>
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