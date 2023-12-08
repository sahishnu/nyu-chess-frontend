
interface IContractActionsProps {
  onClickJoin: () => void
}
export const ContractActions = ({ onClickJoin }: IContractActionsProps) => {
  return (
    <div className="contract-actions">
      <button onClick={onClickJoin}>Join</button>
      <button>Cancel</button>
      <button>Move</button>
      <button>End Game</button>
      <button>Start Timer</button>
      <button>Claim Timeout</button>
    </div>
  )
}