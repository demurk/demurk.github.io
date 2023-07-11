import { useState } from "react";

import Board from "./board";

import "styles/files/minesweeper.scss";

const Minesweeper = () => {
  const [restartTrigger, setRestartTrigger] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setRestartTrigger((prevValue) => !prevValue)}>
        Restart
      </button>
      <Board restartTrigger={restartTrigger} />
    </div>
  );
};

export default Minesweeper;
