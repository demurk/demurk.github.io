import { useCallback, useEffect, RefObject } from "react";
import { CoordinatesType, ChildrenType } from "types/global";
import DynamicWindowSize from "helpers/dynamicWindowSize";

import useDraggable from "./logic";

interface DraggableComponentType extends ChildrenType {
  draggableArea: RefObject<any>;
  initialPos?: CoordinatesType;
  onUnmount?: (position: CoordinatesType) => {} | void;
  style?: {};
}

const DraggableComponent = ({
  draggableArea,
  onUnmount = () => {},
  initialPos,
  children,
  style,
}: DraggableComponentType) => {
  const [windowWidth, windowHeight] = DynamicWindowSize();

  const handleDrag = useCallback(
    ({ x, y }: { x: number; y: number }) => ({
      x: Math.min(Math.max(0, x), windowWidth - 10),
      y: Math.min(Math.max(0, y), windowHeight - 10),
    }),
    []
  );

  const { draggableRef, position } = useDraggable({
    onDrag: handleDrag,
    draggableArea,
    initialPos,
  });

  useEffect(
    () => () => {
      onUnmount(position.current);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div ref={draggableRef} style={{ display: "flex", ...style }}>
      {children}
    </div>
  );
};

export default DraggableComponent;
