import React, { useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import * as htmlToImage from "html-to-image";

export const UserContext = createContext();

const UserProvider = (({ children }) => {
  const storedValues = JSON.parse(localStorage.getItem("value"));

  const getInitialValue = (key, defaultValue) => {
    return storedValues ? storedValues[key] : defaultValue;
  };

  const [size, setSize] = useState(() => getInitialValue("iconSize", 0));
  const [rotate, setRotate] = useState(() => getInitialValue("iconRotate", 0));
  const [color, setColor] = useState(() =>
    getInitialValue("iconColor", "rgba(255,255,255,1)")
  );
  const [rounded, setRounded] = useState(() => getInitialValue("bgRounded", 0));
  const [padding, setPadding] = useState(() => getInitialValue("bgPadding", 0));
  const [bgColor, setBgColor] = useState(() =>
    getInitialValue("bgColor", "rgba(255,255,255,1)")
  );
  const [imageSrc, setImageSrc] = useState(null);
  const logoRef = useRef();

  const downloadLogoPng = () => {
    const node = logoRef.current;const downloadLogoPng = async () => {
    const node = logoRef.current;
    
    if (!node) {
      alert("Erreur: aucune préview disponible");
      return;
    }

    try {
      // Attendre que toutes les images soient chargées
      const images = node.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          });
        })
      );

      // Capturer l'image
      const dataUrl = await htmlToImage.toPng(node);
      const link = document.createElement("a");
      link.download = `logo-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      alert("Erreur lors du téléchargement du logo");
    }
  }
    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `logo-${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Could not generate image", error);
      });
  };

  useEffect(() => {
    const updatedValue = {
      ...storedValues,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      imageSrc: imageSrc,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: bgColor,
    };
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, rotate, color, rounded, padding, bgColor, imageSrc]);

  const value = {
    size,
    setSize,
    rotate,
    setRotate,
    color,
    setColor,
    rounded,
    setRounded,
    padding,
    setPadding,
    bgColor,
    setBgColor,
    imageSrc,
    setImageSrc,
    logoRef,
    downloadLogoPng,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

export default UserProvider;
