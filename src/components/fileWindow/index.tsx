import { useRef, useEffect, Suspense } from "react";

import {
  FileData,
  ChildrenType,
  CoordinatesType,
  DivMouseType,
} from "types/global";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getSystemAccent } from "redux/reducers/system/systemSlice";
import {
  closeFile,
  minimizeFile,
  maximizeFile,
  saveFilePosition,
  saveFileSize,
  setActiveFile,
} from "redux/reducers/files/fileSlice";

// import DraggableComponent from "helpers/draggable";
import DraggableComponent from "helpers/draggable";

import "styles/file.scss";

interface FileWindowType extends ChildrenType {
  FD: FileData;
  lastPosition: CoordinatesType;
  isActive: boolean;
  isMaximized: boolean;
  lastSize: CoordinatesType;
}

const initX = 100;
const initY = 40;

const FileWindow = ({
  children,
  FD,
  lastPosition,
  isActive,
  isMaximized,
  lastSize,
}: FileWindowType) => {
  const draggableAreaRef = useRef<HTMLInputElement>(null);
  const fileWindowRef = useRef<HTMLDivElement>(null);
  const resizeObserver = useRef<any>(null);
  const fileWindowSize = useRef<CoordinatesType | null>(null);
  const dispatch = useAppDispatch();

  const systemAccent = useAppSelector(getSystemAccent);
  const fileZIndex = isActive ? 10 : 9;

  const onFileClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isActive) {
      dispatch(setActiveFile(FD.id));
    }
    e.stopPropagation();
  };

  useEffect(() => {
    if (!fileWindowRef.current) return;
    resizeObserver.current = new ResizeObserver(() => {
      const rectTemp = fileWindowRef.current?.getClientRects()[0];
      if (
        !(
          rectTemp?.bottom === rectTemp?.height &&
          rectTemp?.right === rectTemp?.width &&
          rectTemp?.left === rectTemp?.x &&
          rectTemp?.top === rectTemp?.y
        )
      ) {
        fileWindowSize.current = {
          x: rectTemp?.width || 0,
          y: rectTemp?.height || 0,
        };
      }
    });
    resizeObserver.current.observe(fileWindowRef.current);
    return () => {
      resizeObserver.current.disconnect();
      if (fileWindowSize.current) {
        dispatch(saveFileSize({ fileId: FD.id, ...fileWindowSize.current }));
      }
    };
  }, []);

  return (
    <DraggableComponent
      draggableArea={draggableAreaRef}
      onUnmount={({ x, y }: CoordinatesType) =>
        dispatch(saveFilePosition({ fileId: FD.id, x, y }))
      }
      initialPos={{
        x: lastPosition.x !== null ? lastPosition.x : initX,
        y: lastPosition.y !== null ? lastPosition.y : initY,
      }}
      setNullPosition={isMaximized}
      style={{ zIndex: fileZIndex, position: "absolute" }}
    >
      <div
        ref={fileWindowRef}
        className={`file${isMaximized ? " maximized" : ""}${
          isActive ? " active" : " unactive-bg"
        }`}
        style={{
          backgroundColor: systemAccent,
          borderColor: systemAccent,
          width: lastSize.x - 2,
          height: lastSize.y - 2,
        }}
        // onClick={(e) => onFileClick(e)}
        onMouseDown={(e) => onFileClick(e)}
      >
        <div
          className="file__header"
          ref={draggableAreaRef}
          onClick={(e: DivMouseType) => {
            if (e.detail === 2) dispatch(maximizeFile(FD.id));
          }}
        >
          <div className="file__name">{FD.name}</div>
          <div className="file__buttons" onClick={(e) => e.stopPropagation()}>
            <button
              className="file__button"
              onClick={(e) => {
                dispatch(minimizeFile(FD.id));
              }}
            >
              <img src="svg/minimize_window.svg" alt="" />
            </button>
            <button
              className="file__button"
              onClick={(e) => {
                dispatch(maximizeFile(FD.id));
              }}
            >
              <img
                src={
                  isMaximized
                    ? "svg/normal_window.svg"
                    : "svg/maximize_window.svg"
                }
                alt=""
                style={isMaximized ? { rotate: "180deg" } : {}}
              />
            </button>
            <button
              className="file__button file__close"
              onClick={(e) => {
                dispatch(closeFile(FD.id));
              }}
            >
              <img
                src="svg/close_window.svg"
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>
        </div>
        <Suspense>
          <div className="file__content primary-bg">{children}</div>
        </Suspense>
      </div>
    </DraggableComponent>
  );
};

export default FileWindow;
