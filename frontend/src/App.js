import React, { useState } from "react";
import "./index.css";

const ImageCaptionGenerator = () => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("This is dummy caption");


  const handleImageChange = (event) => {
    const img = event.target.files[0];
    setImage(img);
    setPreview(URL.createObjectURL(img));
  };

  const handleGenerateCaption = async (event) => {
    // upload image to server using post request




    
  };

  return (
    <>
      <div className="divtop">
        <div className="div1">
          <h1 className="heading">Image Caption Generator</h1>
          <input type="file" onChange={handleImageChange} />
          <div className="imgdiv">
            {preview && <img className="imgcss" src={preview} alt="image" />}
          </div>
          <p style={{fontWeight:"bold"}}>{caption}</p>
          <div>
            <button className="btn" onClick={handleGenerateCaption}>Generate Caption</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCaptionGenerator;


