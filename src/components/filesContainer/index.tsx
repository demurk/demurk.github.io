import { useAppSelector } from "redux/hooks";
import { getMaximizedFiles } from "redux/reducers/files/fileSlice";
import FileWindow from "components/fileWindow";

//Files
import FilesData from "components/filesData";

const FileContainer = () => {
  const maximizedFiles = useAppSelector(getMaximizedFiles);

  return (
    <div className="files__container">
      {maximizedFiles.map(({ data, lastPosition }) => {
        const { fileData, fileComponent } = FilesData[data.id];
        return (
          <FileWindow key={data.id} FD={fileData} lastPosition={lastPosition}>
            {fileComponent}
          </FileWindow>
        );
      })}
    </div>
  );
};

export default FileContainer;
