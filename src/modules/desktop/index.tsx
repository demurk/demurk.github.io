import { useAppSelector } from "redux/hooks";
import { getSystemBackground } from "redux/reducers/system/systemSlice";

import FilePreviewsLayout from "components/filePreviewsLayout";

// Files data
import { FDAboutMe } from "entities/files/aboutMe";
import { FDSettings } from "entities/files/settings";
import { FDMinesweeper } from "entities/files/minesweeper";

import "styles/desktop.scss";

const desktopFiles = [
  FDAboutMe,
  FDMinesweeper,
  { ...FDSettings, initialPositionIndex: -1 },
];

const Desktop = () => {
  const currentBackgroundImage = useAppSelector(getSystemBackground);

  return (
    <>
      <div
        className="desktop"
        style={{
          backgroundImage: `url(${currentBackgroundImage})`,
        }}
      >
        <FilePreviewsLayout filesArray={desktopFiles} />
      </div>
    </>
  );
};

export default Desktop;
