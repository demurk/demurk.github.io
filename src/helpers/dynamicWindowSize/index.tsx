import { useRef, useEffect } from "react";

const DynamicWindowSize = () => {
  const windowSize = useRef<number[]>([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleWindowResize = () => {
      windowSize.current = [window.innerWidth, window.innerHeight];
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize.current;
};

export default DynamicWindowSize;
