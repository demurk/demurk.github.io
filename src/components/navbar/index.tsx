import {
  getOpenedFiles,
  unactiveAllFiles,
  minimizeAllFiles,
} from "redux/reducers/files/FileSlice";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import FileNavbar from "ui/fileNavbar";
import ClockDateWidget from "ui/clockDateWidget";

import "styles/navbar.scss";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const openedFiles = useAppSelector(getOpenedFiles);

  const onTurnOffClick = () => {
    window.open("about:blank", "_self");
    window.close();
  };

  return (
    <div
      className="navbar primary-bg"
      onClick={() => dispatch(unactiveAllFiles())}
    >
      <button className="navbar__start" onClick={onTurnOffClick}>
        O
      </button>
      {Object.values(openedFiles).map(({ data }) => {
        return <FileNavbar key={data.id} {...data} />;
      })}
      <ClockDateWidget />
      <button
        className="navbar__minimize primary-border"
        onClick={() => dispatch(minimizeAllFiles())}
      ></button>
    </div>
  );
};

export default Navbar;
