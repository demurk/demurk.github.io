import { useState, useEffect } from "react";
import { FileData } from "types/global";

import FilePreview from "ui/filePreview";

import "styles/layout.scss";

interface FilePreviewDataType {
  isFocused: boolean;
}

const FilesLayout = ({ filesArray }: { filesArray: Array<FileData> }) => {
  const [filesPreviewData, setFilesPreviewData] = useState<{
    [key: number]: FilePreviewDataType;
  }>({});

  const updateFilesPreviewData = (id: any, key: string, value: any) => {
    setFilesPreviewData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const onFileClick = (id: number) => {
    if (!filesPreviewData[id].isFocused) {
      updateFilesPreviewData(id, "isFocused", true);
    }
  };

  const onAreaClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    Object.keys(filesPreviewData).forEach((id) => {
      updateFilesPreviewData(id, "isFocused", false);
    });
  };

  useEffect(() => {
    filesArray.forEach(({ id }) => {
      updateFilesPreviewData(id, "isFocused", false);
    });
  }, []);

  return (
    <div className="files__layout" onClick={(e) => onAreaClick(e)}>
      {filesArray.map((FD) => {
        const fileReviewData = filesPreviewData[FD.id];
        return (
          <FilePreview
            key={FD.id}
            FD={FD}
            isFocused={fileReviewData?.isFocused}
            onClickCallback={(id: number) => onFileClick(id)}
          />
        );
      })}
    </div>
  );
};

export default FilesLayout;
