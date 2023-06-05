import FilesLayout from "components/filesLayout";
// Files data
import { FDAboutMe } from "components/filesData/aboutMe";

import "styles/desktop.scss";

const desktopFiles = [FDAboutMe];

const Desktop = () => {
  return (
    <div className="desktop">
      <FilesLayout filesArray={desktopFiles} />
    </div>
  );
};

export default Desktop;
