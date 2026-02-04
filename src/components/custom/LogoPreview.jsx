import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function LogoPreview() {
  const { size, rotate, color, rounded, padding, bgColor, imageSrc, logoRef } =
    useContext(UserContext);

  return (
    <div className="flex justify-center items-center">
      <div
        ref={logoRef}
        style={{
          width: "400px",
          height: "400px",
          background: bgColor,
          borderRadius: `${rounded}px`,
          padding: `${padding}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
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
