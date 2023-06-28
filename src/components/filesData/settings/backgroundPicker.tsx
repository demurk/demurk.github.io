import { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getSystemBackground,
  changeBackground,
} from "redux/reducers/system/systemSlice";
import BoxesGallery from "ui/boxesGallery";

type BackgroundType = {
  previewPath: string;
  bgPath: string;
};

const BackgroundPicker = () => {
  const dispatch = useAppDispatch();

  const backgrounds: BackgroundType[] = [];
  const currentBackground = useAppSelector(getSystemBackground);

  const [customBackground, setCustomBackground] =
    useState<BackgroundType | null>(null);

  const onBackgroundChange = (selectedBackground: BackgroundType) => {
    dispatch(changeBackground(selectedBackground.bgPath));
  };

  const onSetCustomBackground = (backgoundBlob: string) => {
    const newCustomBackground = {
      previewPath: backgoundBlob,
      bgPath: backgoundBlob,
    };
    setCustomBackground(newCustomBackground);
    onBackgroundChange(newCustomBackground);
  };

  return (
    <div>
      <div>Select desktop background</div>
      <div className="bg-settings">
        <BoxesGallery
          items={
            customBackground ? [...backgrounds, customBackground] : backgrounds
          }
          currentItem={currentBackground}
          onBoxChange={(selectedItem) => {
            if (typeof selectedItem !== "string") {
              onBackgroundChange(selectedItem);
            }
          }}
        >
          <input
            type="file"
            accept="image/*"
            id="bgFile"
            onChange={(event) => {
              if (event.target.files) {
                onSetCustomBackground(
                  URL.createObjectURL(event.target.files[0])
                );
              }
            }}
          />
          <label htmlFor="bgFile" className="gallery__box bg-upload">
            +
          </label>
        </BoxesGallery>
      </div>
    </div>
  );
};

export default BackgroundPicker;
