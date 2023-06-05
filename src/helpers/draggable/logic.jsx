import { useState, useRef, useCallback, useEffect } from "react";

import throttle from "./throttle";

const id = (x) => x;

const useDraggable = ({ onDrag = id, draggableArea, initialPos } = {}) => {
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

  useEffect(() => {
    const { x, y } = position.current;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  useEffect(() => {
    if (!pressed) {
      return;
    }

    const handleMouseMove = throttle((event) => {
      if (!ref.current || !position.current) {
        return;
      }
      const pos = position.current;
      const elem = ref.current;
      position.current = onDrag({
        x: pos.x + event.movementX,
        y: pos.y + event.movementY,
      });
      elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
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

  return { draggableElement: legacyRef, position };
};

export default useDraggable;
