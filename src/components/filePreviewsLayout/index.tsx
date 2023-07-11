import { useState, useEffect } from "react";
import { FileDataWithPosition, DivMouseType } from "types/global";

import FilePreview from "components/filePreview";
import GridLayout from "./layouts/grid";

import "styles/filePreviewsLayout.scss";

interface FilePreviewDataType {
  isFocused: boolean;
}

const FilePreviewsLayout = ({
  filesArray,
}: {
  filesArray: Array<FileDataWithPosition>;
}) => {
  const [filesPreviewData, setFilesPreviewData] = useState<{
    [key: number]: FilePreviewDataType;
  }>({});

  useEffect(() => {
    updateAllFilesPreviewData("isFocused", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFilesPreviewData = (id: number, key: string, value: any) => {
    setFilesPreviewData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const updateAllFilesPreviewData = (key: string, value: any) => {
    filesArray.forEach(({ id }) => {
      setFilesPreviewData((prev) => ({
        ...prev,
        [id]: { ...prev[id], [key]: value },
      }));
    });
  };

  const onFileClick = (e: DivMouseType, id: number) => {
    updateAllFilesPreviewData("isFocused", false);
    if (e.detail === 2) {
      updateFilesPreviewData(id, "isFocused", false);
    } else if (!filesPreviewData[id].isFocused) {
      updateFilesPreviewData(id, "isFocused", true);
    }
  };

  const onAreaClick = (e: DivMouseType) => {
    // e.stopPropagation();
    updateAllFilesPreviewData("isFocused", false);
  };

  const createOrderedFiles = () => {
    let defaultPosition = 0;

    const filePreviewsArray: { position: number; component: JSX.Element }[] =
      filesArray.map((FD) => {
        const fileReviewData = filesPreviewData[FD.id];

        let position = FD.initialPositionIndex;
        if (!position) {
          position = defaultPosition;
          defaultPosition += 1;
        }

        return {
          position,
          component: (
            <FilePreview
              key={FD.id}
              FD={FD}
              isFocused={fileReviewData?.isFocused}
              onClickCallback={(e: DivMouseType, id: number) =>
                onFileClick(e, id)
              }
            />
          ),
        };
      });

    return filePreviewsArray;
  };

  return (
    <div className="files__layout" onClick={(e) => onAreaClick(e)}>
      <GridLayout filePreviews={createOrderedFiles()} />
    </div>
  );
};

export default FilePreviewsLayout;
