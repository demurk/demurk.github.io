import { useEffect, useState, useRef } from "react";

const minCellWidth = 100;
const minCellHeight = 100;

type GridLayoutType = {
  filePreviews: { position: number; component: JSX.Element }[];
};

type CellsArrayType = {
  position: number;
  fileIndex: number | null;
}[];

const GridLayout = ({ filePreviews }: GridLayoutType) => {
  const [cellsArray, setCellsArray] = useState<CellsArrayType>([]);
  const [currentFilePosition, setCurrentFilePosition] = useState<number>(-1);
  const [initPositions, setInitPositions] = useState<Boolean>(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const resizeObserver = useRef<any>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    resizeObserver.current = new ResizeObserver(() => {
      const gridSize = gridRef.current?.getClientRects()[0];

      const columnsCount = Math.floor((gridSize?.width || 0) / minCellWidth);
      const rowsCount = Math.floor((gridSize?.height || 0) / minCellHeight);

      const maxElements = columnsCount * rowsCount;
      if (maxElements !== gridRef?.current?.childElementCount) {
        createGrid(maxElements);
      }
    });
    resizeObserver.current.observe(gridRef.current);
    return () => resizeObserver.current.disconnect();
  }, []);

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    position: number
  ) => {
    e.currentTarget.className = "dragged";
    setCurrentFilePosition(position);
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setCurrentFilePosition(-1);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {};
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    position: number
  ) => {
    e.preventDefault();
    const newCellsArray = [...cellsArray];
    const dropCell = newCellsArray.find((x) => x.position === position);
    const dragCell = newCellsArray.find(
      (x) => x.position === currentFilePosition
    );

    if (dropCell) {
      dropCell.position = currentFilePosition;
    }
    if (dragCell) {
      dragCell.position = position;
    }

    setCellsArray(newCellsArray);
  };

  const createGrid = (maxElements: number) => {
    const filePositions: number[] = [];
    const cellsData: CellsArrayType = [];

    if (!initPositions) {
      filePreviews.forEach(({ position }, i) => {
        const initPosition = position
          ? position < 0
            ? maxElements + position
            : position
          : 0;

        cellsData.push({ position: initPosition, fileIndex: i });
        filePositions.push(initPosition);
      });
      setInitPositions(true);
    } else {
      cellsData.push(...cellsArray.slice(0, filePreviews.length - 1));
    }

    let skeletonPosition = 0;
    for (let i = 0; i < maxElements - filePreviews.length; i++) {
      while (filePositions.includes(skeletonPosition)) {
        skeletonPosition += 1;
      }
      cellsData.push({ position: skeletonPosition, fileIndex: null });
      skeletonPosition += 1;
    }
    setCellsArray(cellsData);
  };

  const emptyCell = (position: number) => {
    return (
      <div
        draggable={false}
        key={position}
        style={{ order: position }}
        onDrop={(e) => {
          dropHandler(e, position);
        }}
        onDragOver={(e) => dragOverHandler(e)}
      ></div>
    );
  };

  const fileCell = (position: number, fileIndex: number) => {
    return (
      <div
        draggable={true}
        style={{ order: position, margin: "auto" }}
        key={`f${position}`}
        onDragStart={(e) => {
          dragStartHandler(e, position);
        }}
        onDragEnd={(e) => {
          dragEndHandler(e);
        }}
        onDragLeave={(e) => {
          dragLeaveHandler(e);
        }}
        onDragOver={(e) => {
          dragOverHandler(e);
        }}
        onDrop={(e) => {
          dropHandler(e, position);
        }}
      >
        {filePreviews[fileIndex].component}
      </div>
    );
  };

  return (
    <div
      ref={gridRef}
      className="desktop-grid"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCellWidth}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fit, minmax(${minCellHeight}px, 1fr))`,
      }}
    >
      {cellsArray.map(({ position, fileIndex }) => {
        if (fileIndex !== null) {
          return fileCell(position, fileIndex);
        } else {
          return emptyCell(position);
        }
      })}
    </div>
  );
};

export default GridLayout;
