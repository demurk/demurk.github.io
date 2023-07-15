import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { getLeadersData, LeadersType } from "api/leaderboards";
import { FileData, LocalFileData } from "types/global";
import getUniqueUsername from "helpers/uniqueUsername";

import "styles/files/minesweeperLeaderboard.scss";

const leadersLength = 10;

const positionColor: { [key: number]: string } = {
  1: "gold",
  2: "silver",
  3: "bronze",
};

const MSLeaderBoard = () => {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leaders, setLeaders] = useState<LeadersType>([]);

  const { t } = useTranslation("files/minesweeper_leaderboard");

  useEffect(() => {
    setUsername(getUniqueUsername());
  }, []);

  useEffect(() => {
    if (username) getLeaderboard();
  }, [username]);

  const getLeaderboard = () => {
    setIsLoading(true);
    const leadersData = getLeadersData(username, leadersLength);
    leadersData.then((data: LeadersType) => {
      setLeaders(data);
      setIsLoading(false);
    });
  };

  return (
    <div className="leaderboard flex-center">
      <div className="leaderboard__content">
        <table
          className="leaderboard__entries"
          style={{ borderCollapse: "collapse" }}
        >
          <caption className="leaderboard__entries-title">{t("title")}</caption>
          <tbody>
            {!isLoading ? (
              leaders.map(({ position, user, level }) => {
                const isCurrentUser = user === username;
                return (
                  <tr
                    className={`leaderboard__entry ${
                      isCurrentUser ? "is-user" : ""
                    }`}
                    key={position}
                  >
                    <td
                      className={`leaderboard__entry-position number ${
                        positionColor[position] || ""
                      }`}
                    >
                      {[1, 2, 3].includes(position) ? (
                        <img src="img/trophey.png" alt="" />
                      ) : (
                        position
                      )}
                    </td>
                    <td className="leaderboard__entry-name">
                      {user}
                      {isCurrentUser ? " (you)" : ""}{" "}
                    </td>
                    <td className="leaderboard__entry-level number">{level}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="leaderboard__entry-skeleton">
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="leaderboard__update" onClick={getLeaderboard}>
          {t("refresh")}
        </button>
      </div>
    </div>
  );
};

export const FDMSLeaderBoard: FileData = {
  id: 5,
  icon: "minesweeper_lb.png",
  name: "Leaderboard",
};

const FileMSLeaderBoard: { [x: number]: LocalFileData } = {
  [FDMSLeaderBoard.id]: {
    fileComponent: <MSLeaderBoard />,
    fileData: FDMSLeaderBoard,
  },
};

export default FileMSLeaderBoard;
