import FileSlice from "./files/fileSlice";
import configSlice from "./config/configSlice";

const rootReducer = { openedFiles: FileSlice, config: configSlice };
export default rootReducer;
