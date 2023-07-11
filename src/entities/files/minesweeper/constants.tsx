export const CellStates = {
  isRevealed: "revealed",
  isFlagged: "flagged",
  isUnknown: "unknown",
  default: "default",
} as const;

export type CellStatesType = (typeof CellStates)[keyof typeof CellStates];
