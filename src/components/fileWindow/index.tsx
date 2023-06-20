import { useRef, useState } from "react";

import { FileData, ChildrenType, CoordinatesType } from "types/global";
import { useAppDispatch } from "redux/hooks";
import {
  closeFile,
  minimizeFile,
  saveFilePosition,
} from "redux/reducers/files/fileSlice";

import DraggableComponent from "helpers/draggable";

import "styles/file.scss";

interface FileWindowType extends ChildrenType {
  FD: FileData;
  lastPosition: CoordinatesType;
}

const initX = 100;
const initY = 40;

const FileWindow = ({ children, FD, lastPosition }: FileWindowType) => {
  const draggableAreaRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  return (
    <DraggableComponent
      draggableArea={draggableAreaRef}
      onUnmount={({ x, y }: CoordinatesType) =>
        dispatch(saveFilePosition({ fileId: FD.id, x, y }))
      }
      initialPos={{ x: lastPosition.x || initX, y: lastPosition.y || initY }}
    >
      <div className="file primary-border">
        <div className="file__header primary-bg" ref={draggableAreaRef}>
          <div className="file__name">{FD.name}</div>
          <div className="file__buttons">
            <button
              className="file__button"
              onClick={() => dispatch(minimizeFile(FD.id))}
            >
              _
            </button>
            <button
              className="file__button file__close"
              onClick={() => dispatch(closeFile(FD.id))}
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
