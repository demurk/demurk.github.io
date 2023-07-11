import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "redux/hooks";
import { getSystemTheme } from "redux/reducers/system/systemSlice";
import { THEME_DARK } from "helpers/constants";

import "styles/boxesBackground.scss";

const boxSize = 20;
const boxSizePx = `${boxSize - 4}px`;

const BoxesBackground = () => {
  const [maxBoxes, setMaxBoxes] = useState<number>(0);

  const gridRef = useRef<HTMLDivElement>(null);
  const resizeObserver = useRef<any>(null);

  const systemTheme = useAppSelector(getSystemTheme);
  const boxDefaultColor = systemTheme === THEME_DARK ? "grey" : "silver";

  useEffect(() => {
    if (!gridRef.current) return;
    resizeObserver.current = new ResizeObserver(() => {
      const gridSize = gridRef.current?.getClientRects()[0];

      const columnsCount = Math.floor((gridSize?.width || 0) / boxSize);
      const rowsCount = Math.floor((gridSize?.height || 0) / boxSize);

      const maxElements = columnsCount * rowsCount;
      if (maxElements !== gridRef?.current?.childElementCount) {
        setMaxBoxes(maxElements);
      }
    });
    resizeObserver.current.observe(gridRef.current);
    return () => resizeObserver.current.disconnect();
  }, []);

  const getRandomColor = () => {
    return "#" + Math.random().toString(16).substr(-6);
  };

  const BoxElement = () => {
    return (
      <div
        className="box"
        onMouseOver={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          const randomColor = getRandomColor();
          e.currentTarget.style.background = randomColor;
          e.currentTarget.style.boxShadow = `0 0 2px ${randomColor}, 0 0 10px ${randomColor}`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = boxDefaultColor;
          e.currentTarget.style.boxShadow = "0 0 2px #000";
        }}
        style={{
          width: boxSizePx,
          height: boxSizePx,
          backgroundColor: boxDefaultColor,
        }}
      ></div>
    );
  };

  return (
    <div
      ref={gridRef}
      className="boxes-bg"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${boxSize}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fit, minmax(${boxSize}px, 1fr))`,
      }}
    >
      {[...Array(maxBoxes)].map((_, i) => (
        <BoxElement key={i} />
      ))}
    </div>
  );
};

export default BoxesBackground;
