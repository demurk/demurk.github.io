import { useEffect, useState, useReducer } from "react";

import Cell from "./cell";
import GridCell from "./gridCell";
import { CellStates } from "./constants";

const BoardHeight = 2;
const BoardWidth = 2;

const bombsNumber = 1;

type BoardType = {
  restartTrigger: boolean;
};

const Board = ({ restartTrigger }: BoardType) => {
  type BoardType = GridCell[][];
  const [board, setBoard] = useState<BoardType>([]);
  const [bombsLeft, setBombsLeft] = useState<number>(bombsNumber);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  const getNeighbours = (board: BoardType, y: number, x: number) => {
    const res = [];

    for (
      let i = y === 0 ? y : y - 1;
      i <= (y === BoardHeight - 1 ? y : y + 1);
      i++
    ) {
      for (
        let j = x === 0 ? x : x - 1;
        j <= (x === BoardWidth - 1 ? x : x + 1);
        j++
      ) {
        if (!(i === y && j === x)) {
          res.push(board[i][j]);
        }
      }
    }
    return res;
  };

  const generateBombs = () => {
    setBombsLeft(bombsNumber);

    const bombs = [];
    const boardSize = BoardHeight * BoardWidth;

    while (bombs.length < bombsNumber) {
      var r = Math.floor(Math.random() * boardSize);
      if (bombs.indexOf(r) === -1) bombs.push(r);
    }
    return bombs;
  };

  const generateBoard = () => {
    const board: BoardType = [];

    // creating empty board
    for (let i = 0; i < BoardHeight; ++i) {
      board.push([]);
      for (let j = 0; j < BoardWidth; ++j) {
        const gridCell = new GridCell(i, j);
        board[i].push(gridCell);
      }
    }

    // creating bomb cells
    const bombIndexes = generateBombs();
    for (const bombIndex of bombIndexes) {
      const yIndex = Math.floor(bombIndex / BoardHeight);
      const xIndex = bombIndex % BoardWidth;

      const bombCell = board[yIndex][xIndex];
      bombCell.isMine = true;

      // setting number to neighbour cells
      const neighbourCells = getNeighbours(board, yIndex, xIndex);
      for (const neighbourCell of neighbourCells) {
        neighbourCell.incrementNeighbourBombValue();
      }
    }

    setBoard(board);
    setIsRunning(true);
  };

  const revealBombs = () => {
    for (let i = 0; i < BoardHeight; ++i) {
      for (let j = 0; j < BoardWidth; ++j) {
        if (board[i][j].isMine) {
          board[i][j].reveal();
        }
      }
    }
    forceUpdate();
  };

  const revealNeighbours = (startCell: GridCell) => {
    const emptyNeighbours = [startCell];

    for (const emptyNeighbour of emptyNeighbours) {
      const neighbourCells = getNeighbours(
        board,
        emptyNeighbour.y,
        emptyNeighbour.x
      );
      for (const neighbourCell of neighbourCells) {
        if (neighbourCell._state !== CellStates.isRevealed) {
          neighbourCell.reveal();
          if (neighbourCell.n === 0) {
            emptyNeighbours.push(neighbourCell);
          }
        }
      }
    }
  };

  const checkCompletion = () => {
    for (let i = 0; i < BoardHeight; ++i) {
      for (let j = 0; j < BoardWidth; ++j) {
        const cell = board[i][j];
        if (cell._state !== CellStates.isRevealed && !cell.isMine) {
          return false;
        }
      }
    }
    return true;
  };

  const onCellClick = (cell: GridCell) => {
    if (isRunning && cell._state === CellStates.default) {
      if (cell.isMine) {
        revealBombs();
        setIsRunning(false);
        console.log("lost");
      } else {
        cell.reveal();
        if (cell.n === 0) {
          revealNeighbours(cell);
        }

        const isCompleted = checkCompletion();
        if (isCompleted) {
          revealBombs();
          setIsRunning(false);
          console.log("win");
        }

        forceUpdate();
      }
    }
  };

  const onCellContext = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: GridCell
  ) => {
    e.preventDefault();

    if (isRunning) {
      const leftBombsInc = cell.rotateState(bombsLeft === 0);
      if (leftBombsInc) {
        setBombsLeft((prevValue) => prevValue + leftBombsInc);
      } else {
        forceUpdate();
      }
    }
  };

  useEffect(() => {
    generateBoard();
  }, [restartTrigger]);

  useEffect(() => {
    generateBoard();
  }, []);

  return (
    <div className="minesweeper__game-container">
      <div>Bombs left: {bombsLeft}</div>
      {board.map((row) => {
        return (
          <div className="minesweeper__game-row">
            {row.map((cell) => {
              return (
                <Cell
                  key={`cell${cell.x}${cell.y}`}
                  value={cell.n}
                  isMine={cell.isMine}
                  cellState={cell._state}
                  onCellClick={() => onCellClick(cell)}
                  onCellContext={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => {
                    onCellContext(e, cell);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
