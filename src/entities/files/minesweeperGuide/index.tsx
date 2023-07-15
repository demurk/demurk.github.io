import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

import { FileData, LocalFileData } from "types/global";

import "styles/files/minesweeperGuide.scss";

const MSGuide = () => {
  const { t } = useTranslation("files/minesweeper_guide");

  return (
    <div className="ms-guide">
      <div className="ms-guide__content">
        <div className="ms-guide__header">{t("title")}</div>

        <div className="ms-guide__title">{t("object_title")}</div>
        <div className="ms-guide__value">{t("object_value")}</div>
        <div className="ms-guide__title">{t("htp_title")}</div>
        <div className="ms-guide__value">{t("htp_value")}</div>
        <div className="ms-guide__title">{t("example_title")}</div>
        <div className="flex-center">
          <img src="img/ms_guide_example.png" alt="" />
        </div>
        <div className="ms-guide__value">{t("example_value")}</div>
        <div className="ms-guide__title">{t("rules_title")}</div>
        <ul>
          {(t("rules_value", { returnObjects: true }) as []).map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
          <li key={-1}>
            {isMobile ? t("interaction_mobile") : t("interaction_pc")}
          </li>
        </ul>
        <div className="ms-guide__value"></div>
        <div className="ms-guide__title">{t("status_title")}</div>
        <div className="ms-guide__value">{t("status_value")}</div>
      </div>
    </div>
  );
};

export const FDMSGuide: FileData = {
  id: 4,
  icon: "txt_icon.png",
  name: "MS_guide.txt",
};

const FileMSGuideData: { [x: number]: LocalFileData } = {
  [FDMSGuide.id]: {
    fileComponent: <MSGuide />,
    fileData: FDMSGuide,
  },
};

export default FileMSGuideData;
