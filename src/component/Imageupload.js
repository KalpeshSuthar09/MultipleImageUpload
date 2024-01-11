import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const MultipleImageUpload = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    description: ""
  });

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="container mx-auto mt-8">
      <form>
        <div className="mb-4 heading">
          <div className="box flex items-center space-x-2">
          <i class="bi bi-hand-index-fill"></i>
            <h2 className="heading">Animal Matter To Me</h2>
          </div>
        </div>
        <div className="mb-4 content">
          <textarea
            placeholder="some text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div
          {...getRootProps()}
          className={`dropzone  p-4 ${isDragActive ? "border-blue-500" : ""}`}
        >
          <i class="bi bi-card-image">
            <input {...getInputProps()} />
          </i>
        </div>

        <div className="image flex space-x-20 items-center mt-4 overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
          {images.map((image, index) => (
            <div key={index} className="image-preview mt-2 ">
              <img
                src={URL.createObjectURL(image)}
                alt={`img-${index}`}
                className="w-96 h-52"
              />
              <button
                onClick={() => removeImage(index)}
                className="mt-2 px-3 py-1  text-black rounded"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 btn pr-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-96"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultipleImageUpload;
