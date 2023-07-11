import {
  getOpenedFiles,
  minimizeAllFiles,
  getActiveFileId,
} from "redux/reducers/files/fileSlice";
import { getSystemAccent } from "redux/reducers/system/systemSlice";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import FileNavbar from "components/fileNavbar";
import ClockDateWidget from "components/clockDateWidget";
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
    <div className="navbar primary-bg" onMouseDown={(e) => e.stopPropagation()}>
      <button
        className="navbar__start navbar__btn"
        style={{ color: accent }}
        onClick={onTurnOffClick}
      >
        <img src="svg/turn-off.svg" className="primary-svg__alt" alt="" />
      </button>
      <div
        className="navbar__files"
        style={{
          gridTemplateColumns: `repeat(${
            Object.keys(openedFiles).length
          }, minmax(35px, 160px))`,
        }}
      >
        {Object.values(openedFiles).map(({ data }) => {
          return (
            <FileNavbar
              key={data.id}
              FD={{ ...data, isActive: data.id === activeFileId }}
            />
          );
        })}
      </div>
      <div className="navbar__widgets">
        <div className="navbar__btn navbar__lng no-select">
          <LanguageSelect />
        </div>
        <div className="navbar__clock navbar__btn no-select">
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
