import { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import { useAppDispatch } from "redux/hooks";
import { openFile } from "redux/reducers/files/fileSlice";
import { FDMSGuide } from "entities/files/minesweeperGuide";
import { FDMSLeaderBoard } from "entities/files/minesweeperLeaderboard";
import {
  getLeaderRecord,
  updateLeaderRecord,
  createLeaderRecord,
} from "api/leaderboards";

import getUniqueUsername from "helpers/uniqueUsername";
import { LANG_RU } from "helpers/constants";

import Board from "./board";
import FooterButton from "./footerButton";

import "styles/files/minesweeper.scss";

const BoardHeight = 10;
const BoardWidth = 10;

const maxCells = BoardWidth * BoardHeight;

const BombsPerDifficulty = 2;
const MaxDifficulty = Math.floor((maxCells * 0.5) / BombsPerDifficulty);
const MinDifficulty = 1;

const Minesweeper = () => {
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation("files/minesweeper");

  const [restartTrigger, setRestartTrigger] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<number>(5);

  const onWin = (difficulty: number) => {
    const username = getUniqueUsername();
    const currentRecord = getLeaderRecord(username);

    currentRecord.then((data) => {
      if (data.length) {
        if (difficulty > parseInt(data[0].level)) {
          updateLeaderRecord(username, difficulty);
        }
        return;
      }

      createLeaderRecord(username, difficulty);
    });
  };

  return (
    <div className="minesweeper__game no-select">
      <div className="minesweeper__content volume-border">
        <div className="minesweeper__header volume-border-inv">
          <div
            className={`minesweeper__header-label${
              i18n.language === LANG_RU ? " scaled-sm" : ""
            }`}
          >
            {t("dif_tag")}
          </div>
          <div className="minesweeper__header-value">
            <button
              className="btn-dif"
              disabled={difficulty === MinDifficulty}
              onClick={() =>
                setDifficulty((prevValue) =>
                  prevValue === MinDifficulty ? prevValue : prevValue - 1
                )
              }
            >
              -
            </button>
            <div>{difficulty}</div>
            <button
              className="btn-dif"
              disabled={difficulty === MaxDifficulty}
              onClick={() =>
                setDifficulty((prevValue) =>
                  prevValue === MaxDifficulty ? prevValue : prevValue + 1
                )
              }
            >
              +
            </button>
          </div>
        </div>
        <Board
          restartTrigger={restartTrigger}
          boardHeight={BoardHeight}
          boardWidth={BoardWidth}
          bombsNumber={difficulty * BombsPerDifficulty}
          onWin={() => onWin(difficulty)}
        />
        <div className="minesweeper__footer volume-border-inv">
          <FooterButton
            btnText={t("restart")}
            onButtonClick={() => setRestartTrigger((prevValue) => !prevValue)}
          />
          <FooterButton
            btnText={t("htp")}
            onButtonClick={() => dispatch(openFile(FDMSGuide))}
          />
          <FooterButton
            btnText={t("lb")}
            onButtonClick={() => dispatch(openFile(FDMSLeaderBoard))}
          />
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
