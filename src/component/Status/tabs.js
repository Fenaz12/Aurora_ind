import { useState } from "react";
import { Layout, Container, BoxUpload, ImagePreview } from "./ImageStyles";
import FolderIcon from "../../images/folder_icon_transparent.png";
import CloseIcon from "../../images/CloseIcon.svg";
import "./tabs.css";
import "./New.css";
import axios from "axios";

function Tabs(props) {
  const [toggleState, setToggleState] = useState(1);
  const [image, setImage] = useState("");
  const [iLink, setILink] = useState();
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");
  const[text, setText] = useState('Enter your text here');
  const[wcount, setWcount] = useState(0);
  const[disable, setDisable] = useState(true);
  const[extracted, setExtracted] = useState("KFC Biriyani Rice Sawan with 4 pc H&C Chicken,4 Drumlets for Rs.1650. Save Rs.550.0n 4th & 5th Oct. Call 11553253? or order on www.kfc.lk *StopAd? SMS BL KFC to 9010*");
  const [result, setResult] = useState({
    depression:null,
    depstat:"",
    emotion:null,
    emostat:"",
    sentiment:null,
    sentstat:"",
    sucidal:null,
    sucidstat:""
  });

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleTextOnChange = (e) => {
    setText(e.target.value);
    setWcount(text.split(" ").length);
    if (wcount >= 500){
      alert("Maximum Word limit of 500 words is reached. Upgrade to experience 100 word count")
    }
  }

  function submitHandler(e){
    e.preventDefault();
    const postData = {
      "text": text,
      "depression": "true",
      "emotion": "true",
      "suicide": "true",
      "sentiment": "true"
    };
    axios.post("http://127.0.0.1:30/get_text_analysis",null,{params:postData}).then((response) =>{
      console.log(response);
      console.log(response.data);
      props.getResults(response.data);
    });
  }
  /*const submitHandler = e =>{
    
    console.log(text);
  }*/
  function handlingExtracted(){
    const exData = {
      "text": extracted,
      "depression": "true",
      "emotion": "true",
      "suicide": "true",
      "sentiment": "true"
    };
    console.log(extracted);
    axios.post("http://127.0.0.1:30/get_text_analysis",null,{params:exData}).then((response) =>{
      console.log(response);
      console.log(response.data);
      props.getResults(response.data);
    });
  }

  function uploadHandler(e){
    e.preventDefault();
    const imageU = {
      "url": iLink,
    };
    axios.post("http://127.0.0.1:50/extract_text_from_url",null,{params:imageU}).then((response) =>{
      console.log(response);
      setExtracted(response.data.extracted);
      console.log(extracted);
      handlingExtracted();
    });
  };


  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }

    const files = e.target.files
    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("upload_preset", "fvfnovul")

    axios.post("https://api.cloudinary.com/v1_1/dpddlv7o8/image/upload", formData).then((response) =>{
      console.log(response);
      setILink(response.data.secure_url);
    });
}  

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <span>Image</span> Analyzer
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <span>Text</span> Analyzer
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <Container>
            <BoxUpload>
              <div className="image-upload">
                {!isUploaded ? (
                  <>
                    <label htmlFor="upload-input">
                      <img
                        src={FolderIcon}
                        draggable={"false"}
                        alt="placeholder"
                        style={{ width: 100, height: 100 }}
                      />
                      <p style={{ color: "#444" }}>Click to upload image</p>
                    </label>

                    <input
                      id="upload-input"
                      type="file"
                      accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                      onChange={handleImageChange}
                    />
                  </>
                ) : (
                  <ImagePreview>
                    <img
                      className="close-icon"
                      src={CloseIcon}
                      alt="CloseIcon"
                      onClick={() => {
                        setIsUploaded(false);
                        setImage(null);
                      }}
                    />
                    {typeFile.includes("video") ? (
                      <video
                        id="uploaded-image"
                        src={image}
                        draggable={false}
                        controls
                        autoPlay
                        alt="uploaded-img"
                      />
                    ) : (
                      <img
                        id="uploaded-image"
                        src={image}
                        draggable={false}
                        alt="uploaded-img"
                      />
                    )}
                  </ImagePreview>
                )}
              </div>
            </BoxUpload>
            <button className="analyse2" onClick={uploadHandler}>upload</button>
          </Container>
    
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
            <Container>
              <form onSubmit={submitHandler}>
                  <textarea className='textarea' placeholder="Enter your text here..." onChange={handleTextOnChange}></textarea>
                  <input type="submit" className='analyse' value="Check Depression"/>
                  <button className='disableb' disabled={disable}>Summarize text</button>
              </form>
              <p className="word-count">{wcount} words - {text.length} characters</p>
            </Container>
            
        </div>
      </div>
    </div>
  );
}

export default Tabs;