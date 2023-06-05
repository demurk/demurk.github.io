import Navbar from "components/navbar";
import { ChildrenType } from "types/global";
import FilesContainer from "components/filesContainer";

const Layout = ({ children }: ChildrenType) => {
  return (
    <>
      <FilesContainer />
      {children}
      <Navbar />
    </>
  );
};

export default Layout;
