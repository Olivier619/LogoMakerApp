import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Button } from "../ui/button";

export default function ImageUploadController() {
  const { setImageSrc, size, setSize, rotate, setRotate, padding, setPadding, rounded, setRounded, imageHue, setImageHue, imageSaturation, setImageSaturation, imageBrightness, setImageBrightness, transparentBg, setTransparentBg, removeBackground, vectorizeImage } = useContext(UserContext);
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Vérifier le type d'image
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image valide");
      return;
    }

    // Créer une URL pour l'image
    const url = URL.createObjectURL(file);
    console.log("Image uploadée:", url);
    setImageSrc(url);
    event.target.value = ""; // Réinitialiser l'input pour permettre des sélections répétées
  };

  return (
    <>
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 cursor-pointer transition">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageUpload"
        />
        <label htmlFor="imageUpload" className="cursor-pointer block">
          <p className="text-slate-600 font-medium">
            📁 Cliquez pour télécharger une image
          </p>
          <p className="text-sm text-slate-500 mt-2">
            PNG, JPG, GIF, WebP...
          </p>
        </label>
      </div>

      <Button
        onClick={() => setImageSrc(null)}
        variant="outline"
        className="w-full"
      >
        Réinitialiser
      </Button>

            <Button
        onClick={removeBackground}
        variant="outline"
        className="w-full"
      >
        Supprimer l'arrière-plan
      </Button>

      <Button
        onClick={vectorizeImage}
        variant="outline"
        className="w-full"
      >
        Vectoriser l'image (SVG)
      </Button>

      {/* Sliders for image customization */}
      <div className="space-y-4 mt-6">
        {/* Size Slider */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Taille: {size}px
          </label>
          <input
            type="range"
            min="50"
            max="500"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Rotation Slider */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Rotation: {rotate}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={rotate}
            onChange={(e) => setRotate(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Padding Slider */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Padding: {padding}px
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={padding}
            onChange={(e) => setPadding(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Border Radius Slider */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Rayon bordure: {rounded}px
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={rounded}
            onChange={(e) => setRounded(parseInt(e.target.value))}
            className="w-full"
          />
          
        {/* Image Color Filters */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Teinte: {imageHue}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={imageHue}
            onChange={(e) => setImageHue(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Saturation: {imageSaturation}%
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={imageSaturation}
            onChange={(e) => setImageSaturation(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Luminosité: {imageBrightness}%
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={imageBrightness}
            onChange={(e) => setImageBrightness(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Toggle Transparent Background */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="transparentBg"
            checked={transparentBg}
            onChange={(e) => setTransparentBg(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="transparentBg" className="text-sm font-medium text-slate-700">
            Fond transparent
          </label>
        </div>
        </div>
      </div>
    </>
  );
}
// Force reload cache - v2
