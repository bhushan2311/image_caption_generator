import React, { useState, useEffect } from "react";

import "../index.css"
// import Topbar from "./Topbar";
import Topbar from "../Topbar";
// import back2 from "./background/back2.jpg"
import back2 from "../background/back2.jpg"
import Result from "./Result";
import Loader from "./Loader";
// BHushan


const ImageCaptionGenerator = () => {

    const [selectedFile, setSelectedFile] = useState("");
    // const [selectedFile, setSelectedFile] = useState("No file choosen");
    const [preview, setPreview] = useState("");
    const [bool, setBool] = useState(false);

    const [name, setName] = useState("");

    const handleImageChange = (event) => {
        // const img = event.target.files[0].name;
        const img = event.target.files[0];
        setSelectedFile(img);
    };

    const handleGenerateCaption = (event) => {

        if (selectedFile)
            setBool(true);
        else {
            window.alert("Select image first");
        }

    };

    const fetchUser = async () => {
        const url = `http://localhost:8000/fetchnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            }
        });

        const json = await response.json();
        console.log('Ithe user json ', json);
        setName(json.firstname);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchUser();
        }
    }, []);

    return (
        <>
            <div>

                {!bool && <div className="divtop" style={{ backgroundImage: `url(${back2})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 770, width: 1320 }}>

                    <Topbar />
                    <div className="div1">
                        <div className="rightbar">

                            {localStorage.getItem('token') ?

                                <h1 className="heading" >Hello {name}</h1> :
                                <h1 className="heading">
                                    Welcome to VocPix
                                </h1>
                            }

                            <h5 style={{ color: 'black', fontSize: "16px" }}>Let Images Speak <br />Upload an Image to Generate Captivating Captions!</h5>

                           

                            <input type="file" style={{color:"black"}} onChange={handleImageChange} />

                            <div className="imgdiv">
                                {preview && <img className="imgcss" src={preview} alt="image" />}
                            </div>
                            
                            <div>
                                
                                <button className="btnGenerate" onClick={handleGenerateCaption}>Generate Caption</button>

                            </div>
                        </div>
                    </div>
                </div>}

                {bool && <Result img={selectedFile} />}
            </div>
        </>
    );
};

export default ImageCaptionGenerator;
