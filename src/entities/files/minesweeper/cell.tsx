import { CellStates, CellStatesType } from "./constants";

const CellValues = {
  [CellStates.default]: "",
  [CellStates.isFlagged]: "F",
  [CellStates.isUnknown]: "?",
  isMined: "X",
};

type CellType = {
  value: number;
  isMine: boolean;
  cellState: CellStatesType;
  onCellClick: () => void;
  onCellContext: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
const Cell = ({
  value,
  isMine,
  cellState,
  onCellClick,
  onCellContext,
}: CellType) => {
  const getCellValue = () => {
    if (cellState === CellStates.isRevealed) {
      return isMine ? CellValues.isMined : value;
    } else {
      return CellValues[cellState];
    }
  };

  const getCellClassname = () => {
    return cellState === CellStates.isRevealed
      ? `revealed-${value}`
      : cellState;
  };

  return (
    <div
      className={`minesweeper__game-cell ${getCellClassname()} no-select`}
      onClick={onCellClick}
      onContextMenu={(e) => onCellContext(e)}
    >
      {getCellValue()}
    </div>
  );
};

export default Cell;
