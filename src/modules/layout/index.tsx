import { useAppDispatch, useAppSelector } from "redux/hooks";
import { unactiveAllFiles } from "redux/reducers/files/fileSlice";
import { getSystemTheme } from "redux/reducers/system/systemSlice";

import Navbar from "modules/navbar";
import { ChildrenType } from "types/global";
import FilesContainer from "components/filesContainer";

const Layout = ({ children }: ChildrenType) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getSystemTheme);

  return (
    <div
      className={`theme__${theme} container`}
      onMouseDown={() => dispatch(unactiveAllFiles())}
    >
      <FilesContainer />
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;
