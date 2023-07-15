import { isMobile } from "react-device-detect";

import { useAppSelector } from "redux/hooks";
import { getVisibleFiles } from "redux/reducers/files/fileSlice";
import FileWindow from "components/fileWindow";

import FilesData from "entities/files";

const FileContainer = () => {
  const visibleFiles = useAppSelector(getVisibleFiles);

  return (
    <div className="files__container">
      {visibleFiles.map(
        ({
          data,
          lastPosition,
          isActive,
          isMaximized,
          lastSize,
          isMinimized,
        }) => {
          const { fileData, fileComponent } = FilesData[data.id];
          return (
            <FileWindow
              key={data.id}
              FD={fileData}
              lastPosition={lastPosition}
              isActive={isActive}
              isMaximized={isMobile ? true : isMaximized}
              lastSize={lastSize}
              isMinimized={isMinimized}
            >
              {fileComponent}
            </FileWindow>
          );
        }
      )}
    </div>
  );
};

export default FileContainer;
