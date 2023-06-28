import {
  useState,
  useEffect,
  RefObject,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { CoordinatesType, ChildrenType } from "types/global";
import DynamicWindowSize from "helpers/dynamicWindowSize";
import throttle from "lodash.throttle";

interface DraggableComponentType extends ChildrenType {
  draggableArea: RefObject<any>;
  initialPos?: CoordinatesType;
  setNullPosition?: boolean;
  onUnmount?: (position: CoordinatesType) => {} | void;
  style?: {};
}

const DRAG_UPDATE_FPS = 60;

const DraggableComponent = ({
  draggableArea,
  onUnmount = () => {},
  initialPos,
  setNullPosition = false,
  children,
  style,
}: DraggableComponentType) => {
  const initPosition = initialPos ? initialPos : { x: 0, y: 0 };

  const [pressed, setPressed] = useState<Boolean>(false);
  const [throttledPosition, setThrottledPosition] =
    useState<CoordinatesType>(initPosition);

  const [windowWidth, windowHeight] = DynamicWindowSize();
  const draggableRef = useRef<HTMLDivElement>(null);
  const position = useRef<CoordinatesType>(initPosition);

  const throttledDrag = useMemo(() => {
    return throttle((coordinates) => {
      setThrottledPosition(coordinates);
    }, 1000 / DRAG_UPDATE_FPS);
  }, []);

  const dragBoundaries = ({ x, y }: CoordinatesType) => {
    return {
      x: Math.min(Math.max(0, x), windowWidth - 10),
      y: Math.min(Math.max(0, y), windowHeight - 10),
    };
  };

  useEffect(() => {
    if (!pressed) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!setNullPosition) {
        const newCoordinates = dragBoundaries({
          x: position.current.x + event.movementX,
          y: position.current.y + event.movementY,
        });
        throttledDrag(newCoordinates);
        position.current = newCoordinates;
      }
    };

    const handleMouseUp = (e: any) => {
      if (e?.target?.style) {
        e.target.style.userSelect = "auto";
        setPressed(false);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pressed]);

  useEffect(() => {
    const handleMouseDown = (e: any) => {
      e.target.style.userSelect = "none";
      setPressed(true);
    };
    draggableArea.current.addEventListener("mousedown", handleMouseDown);

    return () => {
      if (draggableArea?.current) {
        draggableArea.current.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, []);

  useEffect(
    () => () => {
      onUnmount(position.current);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      ref={draggableRef}
      style={{
        top: `${setNullPosition ? 0 : throttledPosition.y}px`,
        left: `${setNullPosition ? 0 : throttledPosition.x}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;
