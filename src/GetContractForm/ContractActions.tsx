
interface IContractActionsProps {
  onClickJoin: () => void
}
export const ContractActions = ({ onClickJoin }: IContractActionsProps) => {
  return (
    <div className="contract-actions">
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-start' }}>
        <input placeholder="Wager Amount (ETH)" />
        <button style={{ marginLeft: '1rem' }} onClick={onClickJoin}>Join</button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-start' }}>
        <input placeholder="PGN String" />
        <input placeholder="Sequence #" />
        <button>Make Move</button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-start' }}>
        <button>Cancel Game</button>
        <button>End Game</button>
        <button>Start Timer</button>
        <button>Claim Timeout</button>
      </div>
    </div>
  )
}