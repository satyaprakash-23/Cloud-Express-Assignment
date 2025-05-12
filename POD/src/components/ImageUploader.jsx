import { useState } from "react";

const ImageUploader = ({ onImageSelect, theme }) => {
  const [preview, setPreview] = useState(null);
  const [hover, setHover] = useState(false);
  console.log(hover);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelect(url);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelect(url);
    }
  };

  return (
    <div
      className="max-w-full max-h-full bg-gray-100 border-2 border-dashed border-gray-400 rounded flex flex-col items-center justify-center p-4 text-center overflow-hidden"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {!preview ? (
        <>
          <div className="text-5xl mb-2">🖼️</div>
          <p className="text-gray-600">Drop an image here or</p>
          <label
            className={`px-6 py-2 rounded-md transition-all duration-300 ${theme.btn} transform hover:scale-105 `}
          >
            Select File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">10 MB maximum</p>
        </>
      ) : (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="h-60 w-full overflow-hidden object-contain border-2 border-black"
        >
          {hover ? (
            <div className="w-full md:w-4/5 lg:w-full xl:w-4/5 mx-auto">
              <div className="text-5xl mb-2">🖼️</div>
              <p className="text-gray-600 mb-2">Drop an image here or</p>
              <label
                className={`px-6 py-2 rounded-md transition-all duration-300 ${theme.btn} transform hover:scale-105 `}
              >
                Select File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">10 MB maximum</p>
            </div>
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-w-full h-full object-contain rounded"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
