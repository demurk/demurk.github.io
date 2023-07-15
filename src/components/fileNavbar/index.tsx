import { displayOrMinimzeFile } from "redux/reducers/files/fileSlice";
import { getSystemAccent } from "redux/reducers/system/systemSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { FileDataWithActive } from "types/global";

const FileNavbar = ({ FD }: { FD: FileDataWithActive }): JSX.Element => {
  const dispatch = useAppDispatch();
  const systemAccent = useAppSelector(getSystemAccent);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(displayOrMinimzeFile(FD.id));
      }}
      className={`navbar__file navbar__btn ${
        FD.isActive ? " active" : ""
      } no-select`}
    >
      <div className="navbar__file-info">
        <div className="navbar__file-icon flex-center">
          <img src={`img/${FD.icon}`} alt="" draggable={false} />
        </div>
        <div className="navbar__file-name no-select">{FD.name}</div>
      </div>
      <div
        className={`navbar__file-shadow${FD.isActive ? " active" : ""}`}
        style={{ backgroundColor: systemAccent }}
      ></div>
    </div>
  );
};

export default FileNavbar;
