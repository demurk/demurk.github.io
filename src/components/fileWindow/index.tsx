import { useRef, useCallback } from "react";

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
  setActiveFile,
} from "redux/reducers/files/fileSlice";

// import DraggableComponent from "helpers/draggable";
import DraggableComponent from "helpers/draggablev2";

import "styles/file.scss";

interface FileWindowType extends ChildrenType {
  FD: FileData;
  lastPosition: CoordinatesType;
  isActive: boolean;
  isMaximized: boolean;
}

const initX = 100;
const initY = 40;

const FileWindow = ({
  children,
  FD,
  lastPosition,
  isActive,
  isMaximized,
}: FileWindowType) => {
  const draggableAreaRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const systemAccent = useAppSelector(getSystemAccent);
  const fileZIndex = isActive ? 10 : 9;

  const onFileClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isActive) {
      dispatch(setActiveFile(FD.id));
    }
    e.stopPropagation();
  };

  return (
    <DraggableComponent
      draggableArea={draggableAreaRef}
      onUnmount={({ x, y }: CoordinatesType) =>
        dispatch(saveFilePosition({ fileId: FD.id, x, y }))
      }
      initialPos={{ x: lastPosition.x || initX, y: lastPosition.y || initY }}
      setNullPosition={isMaximized}
      style={{ zIndex: fileZIndex, position: "absolute" }}
    >
      <div
        className={`file${isMaximized ? " maximized" : ""}`}
        style={{
          backgroundColor: systemAccent,
          borderColor: systemAccent,
        }}
        onClick={(e) => onFileClick(e)}
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
              _
            </button>
            <button
              className="file__button"
              onClick={(e) => {
                dispatch(maximizeFile(FD.id));
              }}
            >
              O
            </button>
            <button
              className="file__button file__close"
              onClick={(e) => {
                dispatch(closeFile(FD.id));
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="file__content primary-bg">{children}</div>
      </div>
    </DraggableComponent>
  );
};

export default FileWindow;
