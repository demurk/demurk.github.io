import { FileData, LocalFileData } from "types/global";

import Minesweeper from "./game";

export const FDMinesweeper: FileData = {
  id: 3,
  icon: "minesweeper_icon.webp",
  name: "Minesweeper.exe",
};

const FileMinesweeperData: { [x: number]: LocalFileData } = {
  [FDMinesweeper.id]: {
    fileComponent: <Minesweeper />,
    fileData: FDMinesweeper,
  },
};

export default FileMinesweeperData;
