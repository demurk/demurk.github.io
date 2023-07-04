import { ChildrenType } from "types/global";

import "styles/boxesGallery.scss";

interface BoxesGalleryType extends ChildrenType {
  items: string[] | { previewPath: string; bgPath: string }[];
  currentItem: string;
  onBoxChange: (
    selectedBox: string | { previewPath: string; bgPath: string }
  ) => any;
  title?: string | null;
}

const BoxesGallery = ({
  items,
  currentItem,
  onBoxChange,
  title = null,
  children,
}: BoxesGalleryType) => {
  return (
    <>
      {title ? <div>{title}</div> : null}

      <div className="gallery__boxes">
        {items.map((item) => {
          const isImage = typeof item !== "string";
          const isActive = isImage
            ? currentItem === item.bgPath
            : currentItem === item;
          return (
            <button
              key={isImage ? item.previewPath : item}
              className={`gallery__box primary-border${
                isActive ? " active primary-border" : ""
              }`}
              style={!isImage ? { background: item } : {}}
              onClick={() => {
                onBoxChange(item);
              }}
            >
              {isActive ? (
                <img
                  src="svg/accept-mark.svg"
                  className="primary-svg__alt active-mark"
                  alt=""
                />
              ) : null}
              {isImage ? (
                <img
                  src={item.previewPath}
                  alt=""
                  className="gallery__box--image"
                />
              ) : null}
            </button>
          );
        })}

        <>{children}</>
      </div>
    </>
  );
};

export default BoxesGallery;
