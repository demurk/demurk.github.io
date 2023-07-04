import { useAppSelector } from "redux/hooks";
import { getSystemBackground } from "redux/reducers/system/systemSlice";

import FilesLayout from "components/filesLayout";

// Files data
import { FDAboutMe } from "components/filesData/aboutMe";
import { FDSettings } from "components/filesData/settings";

import "styles/desktop.scss";

const desktopFiles = [
  { ...FDAboutMe },
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
        <FilesLayout filesArray={desktopFiles} />
      </div>
    </>
  );
};

export default Desktop;
