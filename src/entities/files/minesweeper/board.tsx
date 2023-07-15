import { useEffect, useState, useReducer } from "react";

import Cell from "./cell";
import GridCell from "./gridCell";
import { CellStates } from "./constants";
import { CoordinatesType } from "types/global";

const gameStates = {
  running: 0,
  lost: 1,
  won: 2,
};

type BoardType = {
  restartTrigger: boolean;
  boardHeight: number;
  boardWidth: number;
  bombsNumber: number;
  onWin: () => void;
};

const Board = ({
  restartTrigger,
  boardHeight,
  boardWidth,
  bombsNumber,
  onWin,
}: BoardType) => {
  type BoardType = GridCell[][];
  const [board, setBoard] = useState<BoardType>([]);
  const [bombsLeft, setBombsLeft] = useState<number>(bombsNumber);
  const [gameState, setGameState] = useState<number>(gameStates.running);
  const [lastClicked, setLastCliked] = useState<CoordinatesType>({
    x: -1,
    y: -1,
  });
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  const getNeighbours = (board: BoardType, y: number, x: number) => {
    const res = [];
    const xMin = x - 1;
    const xMax = x + 1;

    for (
      let i = y === 0 ? y : y - 1;
      i <= (y === boardHeight - 1 ? y : y + 1);
      i++
    ) {
      for (
        let j = x === 0 ? x : xMin;
        j <= (x === boardWidth - 1 ? x : xMax);
        j++
      ) {
        if (!(i === y && j === x)) {
          res.push(board[i][j]);
        }
      }
    }
    return res;
  };

  const generateBombs = (safeCell: GridCell) => {
    const safeZoneCells: number[] = [];

    for (let i = -1; i < 2; ++i) {
      const yIndex = (safeCell.y + i) * boardWidth;
      for (let j = -1; j < 2; ++j) {
        safeZoneCells.push(yIndex + safeCell.x + j);
      }
    }
    const safeZoneCellsLen = safeZoneCells.length;

    const occupiedCells = [...safeZoneCells];
    const boardSize = boardHeight * boardWidth;

    while (occupiedCells.length < bombsNumber + safeZoneCellsLen) {
      var r = Math.floor(Math.random() * boardSize);
      if (occupiedCells.indexOf(r) === -1) {
        occupiedCells.push(r);

        const yIndex = Math.floor(r / boardHeight);
        const xIndex = r % boardWidth;

        const bombCell = board[yIndex][xIndex];
        bombCell.isMine = true;

        const neighbourCells = getNeighbours(board, yIndex, xIndex);
        for (const neighbourCell of neighbourCells) {
          neighbourCell.incrementNeighbourBombValue();
        }
      }
    }
  };

  const generateBoard = () => {
    const board: BoardType = [];

    for (let i = 0; i < boardHeight; ++i) {
      board.push([]);
      for (let j = 0; j < boardWidth; ++j) {
        const gridCell = new GridCell(i, j);
        board[i].push(gridCell);
      }
    }

    setBoard(board);
    setGameState(gameStates.running);
    setBombsLeft(bombsNumber);
    setLastCliked({ x: -1, y: -1 });
  };

  const revealBombs = () => {
    for (let i = 0; i < boardHeight; ++i) {
      for (let j = 0; j < boardWidth; ++j) {
        if (
          board[i][j]._state !== CellStates.isRevealed &&
          board[i][j].isMine
        ) {
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
    for (let i = 0; i < boardHeight; ++i) {
      for (let j = 0; j < boardWidth; ++j) {
        const cell = board[i][j];
        if (cell._state !== CellStates.isRevealed && !cell.isMine) {
          return false;
        }
      }
    }
    return true;
  };

  const onCellClick = (cell: GridCell) => {
    if (
      gameState === gameStates.running &&
      cell._state === CellStates.default
    ) {
      if (lastClicked.x === -1) {
        generateBombs(cell);
      }

      setLastCliked({ x: cell.x, y: cell.y });
      if (cell.isMine) {
        revealBombs();
        setGameState(gameStates.lost);
      } else {
        cell.reveal();
        if (cell.n === 0) {
          revealNeighbours(cell);
        }

        const isCompleted = checkCompletion();
        if (isCompleted) {
          revealBombs();
          setGameState(gameStates.won);
          onWin();
        }
      }
    }
  };

  const onCellContext = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cell: GridCell
  ) => {
    e.preventDefault();

    if (gameState === gameStates.running) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartTrigger, bombsNumber]);

  useEffect(() => {
    generateBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="minesweeper__game-container">
      <div className="minesweeper__game-bombs volume-border-inv">
        {bombsLeft}
      </div>
      <div className="minesweeper__game-board volume-border-inv">
        {board.map((row, i) => {
          return (
            <div className="minesweeper__game-row" key={i}>
              {row.map((cell) => {
                return (
                  <Cell
                    key={`${cell.x}${cell.y}`}
                    value={cell.n}
                    isMine={cell.isMine}
                    cellState={cell._state}
                    isLastClicked={
                      lastClicked.x === cell.x && lastClicked.y === cell.y
                    }
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
    </div>
  );
};

export default Board;
