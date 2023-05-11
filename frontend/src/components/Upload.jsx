import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import "./index.css";
import "../index.css"
// import Topbar from "./Topbar";
import Topbar from "../Topbar";
// import back2 from "./background/back2.jpg"
import back2 from "../background/back2.jpg"
import Result from "./Result";
import Loader from "./Loader";
// BHushan
const ImageCaptionGenerator = () => {
    
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState("");
    const [bool, setBool] = useState(false);


    const handleImageChange = (event) => {
        const img = event.target.files[0];
        setSelectedFile(img);
    };

    const handleGenerateCaption = (event) => {

        if(selectedFile)
            setBool(true);
        else{
            window.alert("select image first");
        }

    };

    return (
        <>
            <div>

                {!bool && <div className="divtop" style={{ backgroundImage: `url(${back2})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 770, width: 1320 }}>

                    <Topbar />
                    <div className="div1">
                        <div className="rightbar">
                            <h1 className="heading">Caption Generator</h1>
                            <h5>upload image below</h5>

                            <input type="file" onChange={handleImageChange} />
                            <div className="imgdiv">
                                {preview && <img className="imgcss" src={preview} alt="image" />}
                            </div>
                            <Loader/>
                            <div>
                                {/* <Link to='/result'>
                                <button className="btn" onClick={() => <Result str="hi" />}>Generate Caption</button>    
                            </Link> */}
                                <button className="btn" onClick={handleGenerateCaption}>Generate Caption</button>

                            </div>
                        </div>
                    </div>
                </div>}

                {bool && <Result img={selectedFile}/>}
            </div>
        </>
    );
};

export default ImageCaptionGenerator;
