import { useAppDispatch } from "redux/hooks";
import { openFile } from "redux/reducers/files/fileSlice";
import { FileDataWithPosition, DivMouseType } from "types/global";

type FilePreviewType = {
  FD: FileDataWithPosition;
  isFocused: Boolean;
  onClickCallback: (e: DivMouseType, id: number) => {} | void;
};

const FilePreview = ({
  FD,
  isFocused,
  onClickCallback,
}: FilePreviewType): JSX.Element => {
  const dispatch = useAppDispatch();

  const onPreviewClick = (e: DivMouseType) => {
    e.stopPropagation();
    onClickCallback(e, FD.id);
    if (e.detail === 2) dispatch(openFile(FD));
  };

  return (
    <div
      onClick={(e) => onPreviewClick(e)}
      className={`file__preview no-select ${isFocused ? "focused" : ""}`}
    >
      <img
        src={`img/${FD.icon}`}
        alt=""
        draggable={false}
        className="file__preview-icon no-select"
      />
      <div className="file__preview-name no-select">{FD.name}</div>
    </div>
  );
};

export default FilePreview;
