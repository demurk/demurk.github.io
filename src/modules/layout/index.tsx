import { useAppDispatch } from "redux/hooks";
import { unactiveAllFiles } from "redux/reducers/files/fileSlice";

import Navbar from "components/navbar";
import { ChildrenType } from "types/global";
import FilesContainer from "components/filesContainer";

const Layout = ({ children }: ChildrenType) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="theme__light container"
      onClick={() => dispatch(unactiveAllFiles())}
    >
      <FilesContainer />
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;
