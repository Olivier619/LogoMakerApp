import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Button } from "../ui/button";

export default function ImageUploadController() {
  const { setImageSrc } = useContext(UserContext);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez selectioner une image valide");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-slate-50">
      <h3 className="font-semibold text-lg">Image du logo</h3>
      
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
            📁 Cliquez pour telecharger une image
          </p>
          <p className="text-sm text-slate-500 mt-2">
            PNG, JPG, GIF, WebP...
          </p>
        </label>
      </div>

      <Button
        onClick={() => {
          setImageSrc(null);
        }}
        variant="outline"
        className="w-full"
      >
        Reinitialiser
      </Button>
    </div>
  );
}
