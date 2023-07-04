import { useAppSelector } from "redux/hooks";
import { getVisibleFiles } from "redux/reducers/files/fileSlice";
import FileWindow from "components/fileWindow";

//Files
import FilesData from "components/filesData";

const FileContainer = () => {
  const visibleFiles = useAppSelector(getVisibleFiles);

  return (
    <div className="files__container">
      {visibleFiles.map(
        ({ data, lastPosition, isActive, isMaximized, lastSize }) => {
          const { fileData, fileComponent } = FilesData[data.id];
          return (
            <FileWindow
              key={data.id}
              FD={fileData}
              lastPosition={lastPosition}
              isActive={isActive}
              isMaximized={isMaximized}
              lastSize={lastSize}
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
