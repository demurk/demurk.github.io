import { useState } from "react";

import { HexColorPicker } from "react-colorful";
import { useDebouncyFn } from "use-debouncy";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getSystemAccent,
  changeAccent,
} from "redux/reducers/system/systemSlice";
import BoxesGallery from "ui/boxesGallery";

const presetColors = ["#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808"];

const ColorPicker = () => {
  const dispatch = useAppDispatch();
  const currentSystemColor = useAppSelector(getSystemAccent);

  const { t } = useTranslation("files/settings");

  const [tmpColor, setTmpColor] = useState<string>(currentSystemColor);
  const [recentColors, setRecentColors] = useState<string[]>([
    currentSystemColor,
  ]);

  const handleChange = useDebouncyFn((color: string) => {
    dispatch(changeAccent(color));

    if (!recentColors.includes(color)) {
      const newRecentColors = [color, ...recentColors.slice(0, 4)];
      setRecentColors(newRecentColors);
    }
  }, 200);

  const colorSwatches = (title: string, colors: string[]) => {
    return (
      <BoxesGallery
        title={t(title)}
        items={colors}
        currentItem={currentSystemColor}
        onBoxChange={(selectedBox) => {
          if (typeof selectedBox === "string") {
            setTmpColor(selectedBox);
            dispatch(changeAccent(selectedBox));
          }
        }}
      />
    );
  };

  return (
    <>
      <div className="picker__menu">
        <HexColorPicker
          color={currentSystemColor}
          onChange={(color) => {
            setTmpColor(color);
            handleChange(color);
          }}
        />
        <div
          className="picker__preview"
          style={{ backgroundColor: tmpColor }}
        ></div>
      </div>
      {colorSwatches("recent_colors", recentColors)}
      {colorSwatches("default_colors", presetColors)}
    </>
  );
};

export default ColorPicker;
