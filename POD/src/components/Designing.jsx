import ImageUploader from "./ImageUploader";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const themes = [
  {
    bg: "bg-gray-100",
    card: "bg-white border border-gray-300",
    input: "border-gray-300",
    btn: "bg-black text-white hover:bg-gray-800",
  },
  {
    bg: "bg-gradient-to-r from-purple-100 via-pink-100 to-red-100",
    card: "bg-white border border-purple-400 shadow-lg",
    input: "border-purple-300",
    btn: "bg-purple-600 text-white hover:bg-purple-800",
  },
  {
    bg: "bg-[#1e1e1e] text-white",
    card: "bg-[#2a2a2a] border border-gray-700",
    input: "border-gray-600 bg-[#3a3a3a] text-white",
    btn: "bg-white text-black hover:bg-gray-300",
  },
];

const Designing = () => {
  const [themeVersion, setThemeVersion] = useState(0);
  const theme = themes[themeVersion];
  console.log(theme);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleKeyDown = (e) => {
    console.log(e);

    if (e.altKey && e.key === "q") {
      setThemeVersion((prev) => (prev + 1) % themes.length);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`min-h-screen p-6 ${theme.bg}`}>
        <p className="absolute top-0 left-0 text-center opacity-50">
          Press Alt+q to change style
        </p>
        <div
          className={`max-w-6xl mx-auto rounded-xl shadow-md p-6 ${theme.card}`}
        >
          {/* Top: Image + Form Section */}
          <div className="flex flex-col sm:flex-row gap-6 h-[60vh]">
            <div className="w-full sm:w-[28%] bg-gray-200 border border-dashed border-gray-400 rounded flex items-center justify-center">
              {selectedImage ? (
                <img
                  className="max-h-full max-w-full object-contain"
                  src={selectedImage}
                  alt="preview"
                />
              ) : (
                <span className="text-gray-500">Image Preview</span>
              )}
            </div>

            <div className={`w-full sm:w-[72%] rounded p-4 ${theme.card}`}>
              <div className="h-2/4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    defaultValue={180}
                    className={`w-full mt-1 p-2 border rounded ${theme.input}`}
                    {...register("height", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                  />
                  {errors?.height?.type === "pattern" && (
                    <p className="text-red-600">Integers Only</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    defaultValue={80}
                    className={`w-full mt-1 p-2 border rounded ${theme.input}`}
                    {...register("weight", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                  />
                  {errors?.weight?.type === "pattern" && (
                    <p className="text-red-600">Integers Only</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium">Build</label>
                  <select
                    className={`w-full mt-1 p-2 border rounded ${theme.input}`}
                    {...register("build", { required: true })}
                    defaultValue="athletic"
                  >
                    <option value="lean">Lean</option>
                    <option value="reg">Regular</option>
                    <option value="athletic">Athletic</option>
                    <option value="big">Big</option>
                  </select>
                </div>
              </div>
              <div className="h-1/2 w-3/4 m-auto overflow-hidden">
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  theme={theme}
                />
              </div>
            </div>
          </div>

          {/* Bottom: Text Input Section */}
          <div className={`rounded p-4 mt-6 ${theme.card}`}>
            <label className="block text-sm font-medium mb-2">
              T-Shirt Text (max 3 lines)
            </label>
            <textarea
              {...register("description", { required: true })}
              rows="3"
              maxLength={300}
              className={`w-full resize-none p-3 border rounded ${theme.input}`}
              placeholder="Enter up to 3 lines of text..."
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              className={`mt-4 px-6 py-2 rounded transition-colors ${theme.btn}`}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Designing;
