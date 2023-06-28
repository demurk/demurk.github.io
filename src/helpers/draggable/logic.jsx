import { useState, useRef, useCallback, useEffect } from "react";

import throttle from "./throttle";

const useDraggable = ({ onDrag, draggableArea, initialPos } = {}) => {
  const [pressed, setPressed] = useState(false);
  const position = useRef({ x: initialPos?.x || 0, y: initialPos?.y || 0 });
  const ref = useRef();

  const unsubscribe = useRef();
  const legacyRef = useCallback(
    (elem) => {
      ref.current = elem;

      if (unsubscribe.current) {
        unsubscribe.current();
      }
      if (!elem || !draggableArea) {
        return;
      }
      const handleMouseDown = (e) => {
        e.target.style.userSelect = "none";
        setPressed(true);
      };
      draggableArea.current.addEventListener("mousedown", handleMouseDown);
      unsubscribe.current = () => {
        draggableArea.current.removeEventListener("mousedown", handleMouseDown);
      };
    },
    [draggableArea]
  );

  const setFilePos = ({ x, y }) => {
    ref.current.style.left = `${x}px`;
    ref.current.style.top = `${y}px`;
  };

  useEffect(() => {
    setFilePos(position.current);
  }, []);

  useEffect(() => {
    if (
      (initialPos.x === 0 && initialPos.y === 0) ||
      (ref.current.style.left === "0px" && ref.current.style.top === "0px")
    ) {
      setFilePos(initialPos);
    }
  }, [initialPos]);

  useEffect(() => {
    if (!pressed) {
      return;
    }

    const handleMouseMove = throttle((event) => {
      if (!ref.current || !position.current) {
        return;
      }
      const pos = position.current;
      position.current = onDrag({
        x: pos.x + event.movementX,
        y: pos.y + event.movementY,
      });

      setFilePos(pos);
    });
    const handleMouseUp = (e) => {
      e.target.style.userSelect = "auto";
      setPressed(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      handleMouseMove.cancel();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pressed, onDrag]);

  return { draggableRef: legacyRef, position };
};

export default useDraggable;
