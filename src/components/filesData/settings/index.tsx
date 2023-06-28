import { FileData, LocalFileData } from "types/global";
import ColorPicker from "./colorPicker";
import LanguagePicker from "./languagePicker";
import ThemePicker from "./themePicker";
import WallpaperPicker from "./backgroundPicker";

import "styles/files/settings.scss";

export const FDSettings: FileData = {
  id: 2,
  icon: "txt_icon.png",
  name: "Settings",
};

const SettingsFile = () => {
  return (
    <div className="file__settings">
      <LanguagePicker />
      <ThemePicker />
      <ColorPicker />
      <WallpaperPicker />
    </div>
  );
};

const FileSettingsData: { [x: number]: LocalFileData } = {
  [FDSettings.id]: {
    fileComponent: <SettingsFile />,
    fileData: FDSettings,
  },
};

export default FileSettingsData;
