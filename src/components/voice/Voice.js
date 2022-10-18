import React from 'react'
import Recorder from './Recorder'
import Timer from './Timer'
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
 const headers = {
    "content-type": "multipart/form-data",
  };
export default function Voice(){
    const headers = {
        "content-type": "multipart/form-data",
      };
    
      const fileDrop = (files: File[]) => {
        const formData = new FormData();
        
        const file: File = files[0];
        formData.append("file", file);
        console.log(files)
        axios
            .post(" http://127.0.0.1:5000/infer", formData, { headers })
            .then((res) => console.log(res.data));
      };
    
    return(
        <div>
            <DropzoneArea onDrop={fileDrop} />
        </div>
    )
}