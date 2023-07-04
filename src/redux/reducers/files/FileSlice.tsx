import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { FileData, CoordinatesType } from "types/global";

interface FileState {
  isMinimized: boolean;
  isMaximized: boolean;
  lastPosition: CoordinatesType;
  lastSize: CoordinatesType;

  data: FileData;
}

interface FileStateWithActive extends FileState {
  isActive: boolean;
}

const initialFileState = (FD: FileData): FileState => {
  return {
    isMinimized: false,
    isMaximized: false,
    lastPosition: { x: 100, y: 40 },
    lastSize: { x: 400, y: 400 },
    data: FD,
  };
};

export interface FileSliceState {
  data: { [fileId: number]: FileState };
  activeFileId: number | null;
}

const initialState: FileSliceState = {
  data: {},
  activeFileId: null,
};

export const fileSlice = createSlice({
  name: "openedFiles",
  initialState,
  reducers: {
    openFile: (state, action: PayloadAction<FileData>) => {
      const fileId = action.payload.id;
      if (fileId in state.data) {
        fileSlice.caseReducers.displayFile(state, {
          ...action,
          payload: action.payload.id,
        });
      } else {
        state.data[fileId] = { ...initialFileState(action.payload) };
        state.activeFileId = fileId;
      }
    },
    closeFile: (state, action: PayloadAction<number>) => {
      delete state.data[action.payload];
    },
    displayOrMinimzeFile: (state, action: PayloadAction<number>) => {
      const fileId = action.payload;
      if (state.data[fileId].isMinimized || state.activeFileId !== fileId) {
        fileSlice.caseReducers.displayFile(state, action);
      } else {
        fileSlice.caseReducers.minimizeFile(state, action);
      }
    },
    displayFile: (state, action: PayloadAction<number>) => {
      state.data[action.payload].isMinimized = false;
      state.activeFileId = action.payload;
    },
    minimizeFile: (state, action: PayloadAction<number>) => {
      state.data[action.payload].isMinimized = true;
      state.activeFileId = null;
    },
    minimizeAllFiles: (state) => {
      Object.values(state.data).forEach((file) => {
        file.isMinimized = true;
      });
      state.activeFileId = null;
    },
    setActiveFile: (state, action: PayloadAction<number>) => {
      state.activeFileId = action.payload;
    },
    maximizeFile: (state, action: PayloadAction<number>) => {
      state.data[action.payload].isMaximized =
        !state.data[action.payload].isMaximized;
      state.activeFileId = action.payload;
    },
    unactiveAllFiles: (state) => {
      state.activeFileId = null;
    },
    saveFilePosition: (
      state,
      action: PayloadAction<{ fileId: number; x: number; y: number }>
    ) => {
      const { fileId, x, y } = action.payload;
      const currentFile = state.data[fileId];
      if (currentFile) {
        currentFile.lastPosition = { x, y };
      }
    },
    saveFileSize: (
      state,
      action: PayloadAction<{ fileId: number; x: number; y: number }>
    ) => {
      const { fileId, x, y } = action.payload;
      const currentFile = state.data[fileId];

      if (currentFile && x && y) {
        currentFile.lastSize = { x, y };
      }
    },
  },
});

export const {
  openFile,
  closeFile,
  displayFile,
  minimizeFile,
  displayOrMinimzeFile,
  minimizeAllFiles,
  unactiveAllFiles,
  saveFilePosition,
  saveFileSize,
  setActiveFile,
  maximizeFile,
} = fileSlice.actions;

export const getFileState = (state: RootState, fileId: number): FileState => {
  return state.openedFiles.data[fileId];
};

export const getFileData = (state: RootState, fileId: number): FileData => {
  return state.openedFiles.data[fileId].data;
};

export const getOpenedFiles = (state: RootState): FileSliceState["data"] => {
  return state.openedFiles.data;
};

export const getActiveFileId = (state: RootState): number | null => {
  return state.openedFiles.activeFileId;
};

export const getVisibleFiles = (
  state: RootState
): Array<FileStateWithActive> => {
  const openedFilesData = Object.values(state.openedFiles.data).filter(
    (fileState) => fileState.isMinimized === false
  );

  return openedFilesData.map((fileData) => ({
    ...fileData,
    isActive: fileData.data.id === state.openedFiles.activeFileId,
  }));
};

export default fileSlice.reducer;
