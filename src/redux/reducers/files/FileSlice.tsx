import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { FileData, CoordinatesType } from "types/global";

interface FileState {
  isMinimized: boolean;
  isActive: boolean;
  lastPosition: CoordinatesType;

  data: FileData;
}

const initialFileState = (FD: FileData): FileState => {
  return {
    isMinimized: false,
    isActive: true,
    lastPosition: { x: 0, y: 0 },
    data: FD,
  };
};

export interface FilesArrayState {
  [fileId: number]: FileState;
}

const initialState: FilesArrayState = {};

export const fileSlice = createSlice({
  name: "openedFiles",
  initialState,
  reducers: {
    openFile: (state, action: PayloadAction<FileData>) => {
      const fileId = action.payload.id;
      if (fileId in state) {
        fileSlice.caseReducers.maximizeFile(state, {
          ...action,
          payload: action.payload.id,
        });
      } else {
        state[fileId] = { ...initialFileState(action.payload) };
      }
    },
    closeFile: (state, action: PayloadAction<number>) => {
      delete state[action.payload];
    },
    maximizeOrMinimzeFile: (state, action: PayloadAction<number>) => {
      const fileId = action.payload;
      if (state[fileId].isMinimized) {
        fileSlice.caseReducers.maximizeFile(state, action);
      } else {
        fileSlice.caseReducers.minimizeFile(state, action);
      }
    },
    maximizeFile: (state, action: PayloadAction<number>) => {
      state[action.payload].isMinimized = false;
      state[action.payload].isActive = true;
    },
    minimizeFile: (state, action: PayloadAction<number>) => {
      state[action.payload].isMinimized = true;
      state[action.payload].isActive = false;
    },
    minimizeAllFiles: (state) => {
      Object.values(state).forEach((file) => {
        file.isMinimized = true;
        file.isActive = false;
      });
    },
    unactiveAllFiles: (state) => {
      Object.values(state).forEach((file) => {
        file.isActive = false;
      });
    },
    saveFilePosition: (
      state,
      action: PayloadAction<{ fileId: number; x: number; y: number }>
    ) => {
      const { fileId, x, y } = action.payload;
      const currentFile = state[fileId];

      if (currentFile && x && y) {
        currentFile.lastPosition = { x, y };
      }
    },
  },
});

export const {
  openFile,
  closeFile,
  maximizeFile,
  minimizeFile,
  maximizeOrMinimzeFile,
  minimizeAllFiles,
  unactiveAllFiles,
  saveFilePosition,
} = fileSlice.actions;

export const getFileState = (state: RootState, fileId: number): FileState => {
  return state.openedFiles[fileId];
};

export const getFileData = (state: RootState, fileId: number): FileData => {
  return state.openedFiles[fileId].data;
};

export const getOpenedFiles = (state: RootState): FilesArrayState => {
  return state.openedFiles;
};

export const getMaximizedFiles = (state: RootState): Array<FileState> => {
  return Object.values(state.openedFiles).filter(
    (fileState) => fileState.isMinimized === false
  );
};

export default fileSlice.reducer;
