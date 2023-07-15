import FileAboutData from "./aboutMe";
import FileSettingsData from "./settings";
import FileMinesweeperData from "./minesweeper";
import FileMSGuideData from "./minesweeperGuide";
import FileMSLeaderBoard from "./minesweeperLeaderboard";

const FilesData = {
  ...FileAboutData,
  ...FileSettingsData,
  ...FileMinesweeperData,
  ...FileMSGuideData,
  ...FileMSLeaderBoard,
};

export default FilesData;
