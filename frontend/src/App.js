import React, { useState } from "react";

const ImageCaptionGenerator = () => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");

  
  const handleImageChange = (event) => {
    const img = event.target.files[0];
    setImage(img);
    setPreview(URL.createObjectURL(img));
  };

  const handleGenerateCaption = async (event) => {
    // upload image to server using post request
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {preview && <img src={preview} alt="image" />}
      <button onClick={handleGenerateCaption}>Generate Caption</button>
      <p>{caption}</p>
    </div>
  );
};

export default ImageCaptionGenerator;

