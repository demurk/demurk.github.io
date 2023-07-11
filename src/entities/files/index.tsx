import FileAboutData from "./aboutMe";
import FileSettingsData from "./settings";
import FileMinesweeperData from "./minesweeper";

const FilesData = {
  ...FileAboutData,
  ...FileSettingsData,
  ...FileMinesweeperData,
};

export default FilesData;
