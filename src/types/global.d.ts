export interface FileData {
  id: number;
  name: string;
  icon: string;
}

export interface FileDataWithPosition extends FileData {
  initialPositionIndex?: number;
}

export interface LocalFileData {
  fileComponent: JSX.Element,
  fileData: FileData,
}

export interface ChildrenType {
  children: React.ReactNode | React.ReactNode[];
}

export interface CoordinatesType {
  x: number;
  y: number;
}

export type DivMouseType = React.MouseEvent<HTMLDivElement, MouseEvent>