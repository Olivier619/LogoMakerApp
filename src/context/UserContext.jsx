import React, { useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import * as htmlToImage from "html-to-image";

export const UserContext = createContext();

const UserProvider = (({ children }) => {
  const storedValues = JSON.parse(localStorage.getItem("value"));

  const getInitialValue = (key, defaultValue) => {
    return storedValues ? storedValues[key] : defaultValue;
  };

  const [size, setSize] = useState(() => getInitialValue("iconSize", 150));
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
  const [imageHue, setImageHue] = useState(() => getInitialValue("imageHue", 0));
  const [imageSaturation, setImageSaturation] = useState(() => getInitialValue("imageSaturation", 100));
  const [imageBrightness, setImageBrightness] = useState(() => getInitialValue("imageBrightness", 100));
  const [transparentBg, setTransparentBg] = useState(() => getInitialValue("transparentBg", false));

  const logoRef = useRef();

  const downloadLogoPng = async () => {
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
  };

          const removeBackground = async () => {
    if (!imageSrc) {
      alert("Aucune image à traiter");
      return;
    }

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Détecter la couleur de fond (coin supérieur gauche)
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      // Supprimer les pixels similaires à la couleur de fond
      const threshold = 30; // Seuil de tolérance
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Si le pixel est proche de la couleur de fond
        if (Math.abs(r - bgR) < threshold && 
            Math.abs(g - bgG) < threshold && 
            Math.abs(b - bgB) < threshold) {
          data[i + 3] = 0; // Rendre transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const newImageSrc = canvas.toDataURL('image/png');
      setImageSrc(newImageSrc);
      
      alert("Arrière-plan supprimé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'arrière-plan:", error);
      alert("Erreur lors de la suppression de l'arrière-plan");
    }
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
          imageHue: imageHue,
    imageSaturation: imageSaturation,
    imageBrightness: imageBrightness,
    transparentBg: transparentBg,
    };
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, rotate, color, rounded, padding, bgColor, imageSrc, imageHue, imageSaturation, imageBrightness, transparentBg]);

    
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
    setImageSrc,  imageHue,
  setImageHue,
  imageSaturation,
  setImageSaturation,
  imageBrightness,
  setImageBrightness,
  transparentBg,
  setTransparentBg,
    logoRef,
    downloadLogoPng,
        removeBackground,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

export default UserProvider;
