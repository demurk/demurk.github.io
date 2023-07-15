import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { LANG_RU } from "helpers/constants";

type FooterButtonType = {
  btnText: string;
  onButtonClick: () => void;
};

const FooterButton = ({ btnText, onButtonClick }: FooterButtonType) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const { i18n } = useTranslation();

  useEffect(() => {
    const listener = () => {
      setIsPressed(false);
    };
    window.addEventListener("mouseup", listener);
    window.addEventListener("ontouchend", listener);
    return () => {
      window.removeEventListener("mouseup", listener);
      window.removeEventListener("ontouchend", listener);
    };
  }, []);
  return (
    <button
      className={`minesweeper__footer-btn volume-border${
        isPressed ? "-inv pressed" : ""
      }`}
      onMouseDown={() => setIsPressed(true)}
      onClick={onButtonClick}
      onTouchStart={() => setIsPressed(true)}
    >
      <div className={i18n.language === LANG_RU ? " scaled-sm" : ""}>
        {btnText}
      </div>
    </button>
  );
};

export default FooterButton;
