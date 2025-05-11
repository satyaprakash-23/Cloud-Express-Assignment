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
          <label className={`mt-2 cursor-pointer inline-block ${theme.btn} text-black border px-4 py-2 rounded shadow-sm hover:bg-gray-50`}>
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
          className=""
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {!hover ? (
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto object-contain rounded"
            />
          ) : (
            <div className="text-center p-4 border border-dashed border-gray-300 rounded">
              <div className="text-5xl mb-2">🖼️</div>
              <p className="text-gray-600">Drop an image here or</p>
              <label className="mt-2 cursor-pointer inline-block bg-white border px-4 py-2 rounded shadow-sm hover:bg-gray-50">
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
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
