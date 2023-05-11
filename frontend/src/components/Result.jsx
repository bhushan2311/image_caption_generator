import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import '../bgvid.mp4';
import {useSpeechSynthesis} from 'react-speech-kit'
import TransButton from './TransButton';

const Result = (props) => {

  const [preview, setPreview] = useState();
  const [caption, setCaption] = useState();
  const {speak} = useSpeechSynthesis();

  const handleListen = ()=>{
    speak({text:caption})
  }

  const callback = (lang)=>{
    setCaption(lang);
  }

  const fetchCaption = async () => {
    const formData = new FormData();
    formData.append('file', props.img);

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
  }
  useEffect(() => {
    setPreview(URL.createObjectURL(props.img));

    fetchCaption();

  }, [])

  return (
    <div className="result-page">
        {/* <video id="bg-video" src="../bgvid.mp4" autoplay loop muted></video> */}
      <div className="result-window">
        <h1 className="result-heading">Result page</h1>
        {preview && <img className="result-image" src={preview} alt="image" />}
        {caption ? (
          <p className="result-caption">{caption}</p>
        ) : (
          <Loader />
        )}
        <button className="text-to-speech-btn" onClick={handleListen}>
          Convert text to speech
        </button>
        {/* <TransButton callback={callback} caption={caption}/> */}
      </div>
    </div>
  );
}

export default Result;
