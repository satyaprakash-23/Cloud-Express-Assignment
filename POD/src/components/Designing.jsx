import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ImageUploader from "./ImageUploader";

// Theme definitions
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
      <div className={`min-h-screen p-4 md:p-6 ${theme.bg} transition-colors duration-300`}>
        <p className="absolute top-2 left-2 text-xs sm:text-sm opacity-50">
          Press Alt+q to change style
        </p>
        
        <div className={`max-w-6xl mx-auto rounded-xl shadow-md p-4 md:p-6 ${theme.card} transition-colors duration-300`}>
          
          {/* Top: Image + Form Section */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            {/* Image Preview */}
            <div className="w-full lg:w-1/3 aspect-square sm:aspect-auto sm:h-64 md:h-80 lg:h-auto bg-gray-200 border border-dashed border-gray-400 rounded-lg flex items-center justify-center overflow-hidden">
              {selectedImage ? (
                <img
                  className="max-h-full max-w-full object-contain"
                  src={selectedImage}
                  alt="preview"
                />
              ) : (
                <span className="text-gray-500 text-sm md:text-base">Image Preview</span>
              )}
            </div>

            {/* Form Controls */}
            <div className={`w-full lg:w-2/3 rounded-lg p-4 ${theme.card} transition-colors duration-300`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    defaultValue={180}
                    className={`w-full p-2 border rounded-md ${theme.input} transition-colors duration-300`}
                    {...register("height", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                  />
                  {errors?.height?.type === "pattern" && (
                    <p className="text-red-600 text-xs mt-1">Integers Only</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    defaultValue={80}
                    className={`w-full p-2 border rounded-md ${theme.input} transition-colors duration-300`}
                    {...register("weight", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                  />
                  {errors?.weight?.type === "pattern" && (
                    <p className="text-red-600 text-xs mt-1">Integers Only</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Build</label>
                  <select
                    className={`w-full p-2 border rounded-md ${theme.input} transition-colors duration-300`}
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
              
              <div className="w-full md:w-4/5 lg:w-full xl:w-4/5 mx-auto">
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  theme={theme}
                />
              </div>
            </div>
          </div>

          {/* Bottom: Text Input Section */}
          <div className={`rounded-lg p-4 mt-6 ${theme.card} transition-colors duration-300 w-full`}>
            <label className="block text-sm font-medium mb-2">
              T-Shirt Text (max 3 lines)
            </label>
            <div className="relative w-full h-32">
              <textarea
                {...register("description", { required: true })}
                maxLength={300}
                className={`w-full h-full resize-none p-3 border rounded-md ${theme.input} transition-colors duration-300`}
                placeholder="Enter up to 3 lines of text..."
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`px-6 py-2 rounded-md transition-all duration-300 ${theme.btn} transform hover:scale-105`}
            >
              Preview Design
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Designing;