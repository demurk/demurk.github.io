import { CellStates, CellStatesType } from "./constants";

class GridCell {
  x: number;
  y: number;
  n: number;
  _state: CellStatesType;
  private _isMine: boolean;

  constructor(y: number, x: number) {
    this.x = x;
    this.y = y;
    this.n = 0;
    this._isMine = false;
    this._state = CellStates.default;
  }

  incrementNeighbourBombValue() {
    if (!this._isMine) {
      this.n += 1;
    }
  }

  rotateState(skipFlag = false) {
    if (this._state === CellStates.default) {
      if (skipFlag) {
        this._state = CellStates.isUnknown;
      } else {
        this._state = CellStates.isFlagged;
        return -1;
      }
    } else if (this._state === CellStates.isFlagged) {
      this._state = CellStates.isUnknown;
      return 1;
    } else if (this._state === CellStates.isUnknown) {
      this._state = CellStates.default;
    }
    return 0;
  }

  reveal() {
    this._state = CellStates.isRevealed;
  }

  set isMine(n: boolean) {
    this.n = 0;
    this._isMine = n;
  }

  get isMine() {
    return this._isMine;
  }

  get isEmpty() {
    return this.n === 0 && !this.isMine;
  }
}

export default GridCell;
