import { useTranslation } from "react-i18next";

import { FileData, LocalFileData } from "types/global";
import ColorPicker from "./colorPicker";
import ThemePicker from "./themePicker";
import WallpaperPicker from "./backgroundPicker";
import LanguageSelect from "ui/languageSelect";

import "styles/files/settings.scss";

export const FDSettings: FileData = {
  id: 2,
  icon: "settings_icon.png",
  name: "Settings",
};

const SettingsFile = () => {
  const { t } = useTranslation("files/settings");

  return (
    <div className="file__settings">
      <div>
        <div className="text">{t("theme_label")}</div>
        <ThemePicker />
      </div>
      <div>
        <div className="text">{t("lang_label")}</div>
        <LanguageSelect
          menuPlacement="bottom"
          hideButtons={false}
          border={true}
        />
      </div>
      <div className="picker">
        <div className="text">{t("accent_label")}</div>
        <ColorPicker />
      </div>
      <div>
        <div className="text">{t("bg_label")}</div>
        <WallpaperPicker />
      </div>
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
