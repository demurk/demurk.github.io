import { useAppSelector } from "redux/hooks";
import { getMaximizedFiles } from "redux/reducers/files/FileSlice";
import FileWindow from "components/fileWindow";

//Files
import FileAboutData from "components/filesData/aboutMe";

const FilesRenderMap = {
  ...FileAboutData,
};

const FileContainer = () => {
  const maximizedFiles = useAppSelector(getMaximizedFiles);

  return (
    <div className="files__container">
      {maximizedFiles.map(({ data, lastPosition }) => {
        const { fileData, fileComponent } = FilesRenderMap[data.id];
        return (
          <FileWindow key={data.id} FD={fileData} lastPosition={lastPosition}>
            {fileComponent()}
          </FileWindow>
        );
      })}
    </div>
  );
};

export default FileContainer;
