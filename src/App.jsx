import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import axios from 'axios'
import { APIURL } from './helpers'



function InputField() {

  const [result, setResult] = useState("");
  const [searching, setSearching] = useState(false)
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState("");


  const getResult = async (e) => {
    e.preventDefault();
    setResult("")
    setSearching(true);
    const response = await axios.post(APIURL, JSON.stringify({
      prompt: inputValue
    }),
      {

        headers: {
          "Content-Type": "application/json"
        },
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      },
    )
    console.log(response.data.message)
    setSearching(false);
    setResult(response.data.message);
  }

  return (
    <div>
      <Form inputValue={inputValue} setInputValue={setInputValue} result={result} setSearching={setSearching} getResult={getResult} setResult={setResult} setProgress={setProgress} />
      {
        result ?
          <p className="" style={{ fontSize: '1.4em', lineHeight: '1.4em' }}>{result}</p>
          :
          searching ?
            <>
              <h4>Loading...</h4>
              <div className="download-bar-container">
                <div className="download-bar" style={{ width: `${progress}%` }}></div>
              </div>
            </>
            : null
      }
    </div>
  );
}

export default InputField;