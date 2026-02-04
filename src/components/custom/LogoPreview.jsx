import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function LogoPreview() {
  const { size, rotate, color, rounded, padding, bgColor, imageSrc, logoRef, imageHue, imageSaturation, imageBrightness, transparentBg } = useContext(UserContext);

  return (
    <div className="flex justify-center items-center">
      <div
        ref={logoRef}
        style={{
          width: "400px",
          height: "400px",
          background: b: transparentBg ? "transparent" : bgColor,
          borderRadius: `${rounded}px`,
          padding: `${padding}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",,
        filter: `hue-rotate(${imageHue}deg) saturate(${imageSaturation}%) brightness(${imageBrightness}%)`
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Logo"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotate(${rotate}deg)`,
              objectFit: "contain",
            }}
          />
        ) : (
          <p style={{ color: "#999" }}>Aucune image uploadée</p>
        )}
      </div>
    </div>
  );
}
