import {
  getOpenedFiles,
  minimizeAllFiles,
  getActiveFileId,
} from "redux/reducers/files/fileSlice";
import { getSystemAccent } from "redux/reducers/system/systemSlice";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import FileNavbar from "ui/fileNavbar";
import ClockDateWidget from "ui/clockDateWidget";
import LanguageSelect from "ui/languageSelect";

import "styles/navbar.scss";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const openedFiles = useAppSelector(getOpenedFiles);
  const activeFileId = useAppSelector(getActiveFileId);
  const accent = useAppSelector(getSystemAccent);

  const onTurnOffClick = () => {
    window.open("about:blank", "_self");
    window.close();
  };

  return (
    <div className="navbar primary-bg" onClick={(e) => e.stopPropagation()}>
      <button
        className="navbar__start navbar__btn"
        style={{ color: accent }}
        onClick={onTurnOffClick}
      >
        O
      </button>
      {Object.values(openedFiles).map(({ data }) => {
        return (
          <FileNavbar
            key={data.id}
            FD={{ ...data, isActive: data.id === activeFileId }}
          />
        );
      })}
      <div className="navbar__widgets">
        <LanguageSelect />
        <div className="navbar__clock navbar__btn">
          <ClockDateWidget />
        </div>
        <button
          className="navbar__minimize navbar__btn primary-border"
          onClick={() => dispatch(minimizeAllFiles())}
        ></button>
      </div>
    </div>
  );
};

export default Navbar;
