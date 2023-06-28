import fileSlice from "./files/fileSlice";
import systemSlice from "./system/systemSlice";

const rootReducer = {
  openedFiles: fileSlice,
  system: systemSlice,
};
export default rootReducer;
