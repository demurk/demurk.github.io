import { useEffect, useState } from "react";
import DynamicWindowSize from "helpers/dynamicWindowSize";
import FilePreview from "ui/filePreview";
const minCellWidth = 100;
const minCellHeight = 100;

type DesktopGridType = {
  filesArray: {
    id: number;
    name: string;
    icon: string;
    rowEnd?: number;
    colEnd?: number;
  }[];
};

const DesktopGrid = ({ filesArray }: DesktopGridType) => {
  const [width, height] = DynamicWindowSize();

  const columnsCount = Math.floor((width - 20) / minCellWidth);
  const rowsCount = Math.floor((height - 60) / minCellHeight);

  const [cellsArray, setCellsArray] = useState<JSX.Element[]>([]);

  useEffect(() => {
    createGrid();
  }, [columnsCount, rowsCount]);

  const createGrid = () => {
    const cells = [];
    console.log(columnsCount, width, rowsCount, height);
    filesArray.forEach((FD) => {
      cells.push(
        <FilePreview
          key={FD.id}
          FD={FD}
          isFocused={false}
          onClickCallback={() => {}}
        />
      );
    });

    for (let i = cells.length; i < rowsCount * columnsCount; i++) {
      cells.push(
        <div
          key={i}
          style={i === 0 ? { gridRowEnd: -1, gridColumnEnd: -1 } : {}}
        >
          {i === 0 ? "lol" : "kek"}
        </div>
      );
    }
    setCellsArray(cells);
  };

  return (
    <div
      className="desktop-grid"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCellWidth}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fit, minmax(${minCellHeight}px, 1fr))`,
      }}
    >
      {cellsArray}
    </div>
  );
};

export default DesktopGrid;
