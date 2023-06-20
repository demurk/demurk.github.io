import { FileData, LocalFileData } from "types/global";

export const FDAboutMe: FileData = {
  id: 1,
  icon: "txt_icon.png",
  name: "about_me.txt",
};

const FileComponent = () => {
  return (
    <>
      <div>a</div>
    </>
  );
};

const FileAboutData: { [x: number]: LocalFileData } = {
  [FDAboutMe.id]: { fileComponent: <FileComponent />, fileData: FDAboutMe },
};

export default FileAboutData;
