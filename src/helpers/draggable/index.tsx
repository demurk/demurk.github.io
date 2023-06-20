import { useCallback, useEffect, RefObject } from "react";
import { CoordinatesType, ChildrenType } from "types/global";

import useDraggable from "./logic";

interface DraggableComponentType extends ChildrenType {
  draggableArea: RefObject<any>;
  initialPos?: CoordinatesType;
  onUnmount?: (position: CoordinatesType) => {} | void;
}

const DraggableComponent = ({
  draggableArea,
  onUnmount = () => {},
  initialPos,
  children,
}: DraggableComponentType) => {
  const handleDrag = useCallback(
    ({ x, y }: { x: number; y: number }) => ({
      // x: Math.max(0, x),
      // y: Math.max(0, y),
      x,
      y,
    }),
    []
  );

  const { draggableElement, position } = useDraggable({
    onDrag: handleDrag,
    draggableArea,
    initialPos,
  });

  useEffect(
    () => () => {
      console.log("unmount");
      onUnmount({ ...position.current });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div ref={draggableElement} style={{ display: "flex" }}>
      {children}
    </div>
  );
};

export default DraggableComponent;
