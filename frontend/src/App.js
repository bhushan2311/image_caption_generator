import React, { useState } from "react";
import "./index.css";
import Topbar from "./Topbar";
import back2 from "./background/back2.jpg"

// BHushan
const ImageCaptionGenerator = () => {
  // const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("This is dummy caption");


  const handleImageChange = (event) => {
    const img = event.target.files[0];
    setSelectedFile(img);
    // setPreview(URL.createObjectURL(img));
  };

  const handleGenerateCaption = async (event) => {
    // upload image to server using post request
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log("hi");
    try {
      const url = `http://localhost:5000/after`;
      const response = await fetch(url, {
        method: "Post",
        body: formData,
      });
      
      const data = await response.json();
      setCaption(data.caption);
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <>

      <div className="divtop" style={{ backgroundImage: `url(${back2})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 770, width: 1320 }}>

        <Topbar />
        <div className="div1">
          <div className="rightbar">
            <h1 className="heading">Caption Generator</h1>
            <h5>upload image below</h5>

            <input type="file" onChange={handleImageChange} />
            <div className="imgdiv">
              {preview && <img className="imgcss" src={preview} alt="image" />}
            </div>
            <p style={{ fontWeight: "bold" }}>{caption}</p>
            <div>
              <button className="btn" onClick={handleGenerateCaption}>Generate Caption</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCaptionGenerator;


