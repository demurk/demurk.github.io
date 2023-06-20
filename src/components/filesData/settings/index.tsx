import React, { useState } from "react";

import { HexColorPicker } from "react-colorful";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getSystemColor } from "redux/reducers/config/configSlice";
import { FileData, LocalFileData } from "types/global";

export const FDColorPicker: FileData = {
  id: 2,
  icon: "txt_icon.png",
  name: "Settings",
};

const presetColors = ["#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808"];

const ColorPicker = () => {
  const dispatch = useAppDispatch();
  const currentSystemColor = "#123412"; //useAppSelector(getSystemColor);

  const [tmpColor, setTmpColor] = useState<string>(currentSystemColor);

  return (
    <div className="picker">
      <HexColorPicker color={tmpColor} onChange={setTmpColor} />

      <div className="picker__swatches">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className="picker__swatch"
            style={{ background: presetColor }}
            onClick={() => setTmpColor(presetColor)}
          />
        ))}
      </div>
    </div>
  );
};

const FileColorPickerData: { [x: number]: LocalFileData } = {
  [FDColorPicker.id]: {
    fileComponent: <ColorPicker />,
    fileData: FDColorPicker,
  },
};

export default FileColorPickerData;
