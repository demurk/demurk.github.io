import { CellStates, CellStatesType } from "./constants";

const CellValues = {
  [CellStates.default]: "",
  [CellStates.isFlagged]: <img src="img/minesweeper_flag.png" alt="" />,
  [CellStates.isUnknown]: "?",
  isMined: <img src="img/minesweeper_bomb.png" alt="" />,
};

const CellColor: { [key: number]: string } = {
  1: "blue",
  2: "green",
  3: "red",
  4: "darkblue",
  5: "brown",
  6: "cyan",
  7: "black",
  8: "grey",
};

type CellType = {
  value: number;
  isMine: boolean;
  cellState: CellStatesType;
  isLastClicked: boolean;
  onCellClick: () => void;
  onCellContext: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Cell = ({
  value,
  isMine,
  cellState,
  isLastClicked,
  onCellClick,
  onCellContext,
}: CellType) => {
  const getCellValue = () => {
    if (cellState === CellStates.isRevealed) {
      return isMine ? CellValues.isMined : value ? value : "";
    } else {
      return CellValues[cellState];
    }
  };

  const getCellClassname = () => {
    const classNames = [];

    classNames.push(
      cellState === CellStates.isRevealed
        ? `revealed`
        : `${cellState} volume-border`
    );

    if (isLastClicked && isMine) {
      classNames.push("exploded");
    }

    return classNames.join(" ");
  };

  return (
    <div
      className={`minesweeper__game-cell flex-center ${getCellClassname()}`}
      onClick={() => {
        onCellClick();
      }}
      onContextMenu={(e) => onCellContext(e)}
      style={
        cellState === CellStates.isRevealed
          ? {
              color: CellColor[value],
            }
          : {}
      }
    >
      {getCellValue()}
    </div>
  );
};

export default Cell;
