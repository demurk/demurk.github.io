import { maximizeOrMinimzeFile } from "redux/reducers/files/fileSlice";
import { useAppDispatch } from "redux/hooks";
import { FileData } from "types/global";

const FileNavbar = (FD: FileData): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(maximizeOrMinimzeFile(FD.id));
      }}
      className="navbar__file"
    >
      <img src={`img/${FD.icon}`} alt="" draggable={false} />
      <div className="no-select">{FD.name}</div>
    </div>
  );
};

export default FileNavbar;
