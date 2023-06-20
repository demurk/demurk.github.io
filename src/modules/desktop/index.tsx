import FilesLayout from "components/filesLayout";
import DesktopGrid from "../../components/filesLayout/layouts/filesGrid";

// Files data
import { FDAboutMe } from "components/filesData/aboutMe";
import { FDColorPicker } from "components/filesData/settings";

import "styles/desktop.scss";

const desktopFiles = [
  { ...FDAboutMe },
  { ...FDColorPicker, initialPositionIndex: -1 },
];

const Desktop = () => {
  return (
    <div className="desktop">
      <FilesLayout filesArray={desktopFiles} />
      {/* <DesktopGrid filesArray={desktopFiles} /> */}
    </div>
  );
};

export default Desktop;
