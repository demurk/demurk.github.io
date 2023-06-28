import {
  getOpenedFiles,
  unactiveAllFiles,
  minimizeAllFiles,
  getActiveFileId,
} from "redux/reducers/files/fileSlice";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import FileNavbar from "ui/fileNavbar";
import ClockDateWidget from "ui/clockDateWidget";
import LanguageSelect from "ui/languageSelect";

import "styles/navbar.scss";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const openedFiles = useAppSelector(getOpenedFiles);
  const activeFileId = useAppSelector(getActiveFileId);

  const onTurnOffClick = () => {
    window.open("about:blank", "_self");
    window.close();
  };

  return (
    <div className="navbar primary-bg">
      <button className="navbar__start" onClick={onTurnOffClick}>
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
        <div className="navbar__clock">
          <ClockDateWidget />
        </div>
        <button
          className="navbar__minimize primary-border"
          onClick={() => dispatch(minimizeAllFiles())}
        ></button>
      </div>
    </div>
  );
};

export default Navbar;
