import React, { useState } from "react";
import axios from 'axios'
import { Image, Prompt } from './pages';
import { APIURL } from './helpers'
import Loading from './assets/loading.gif'
import { ToggleSwitch } from "./components";
import "./App.css";

function InputField() {

  const [result, setResult] = useState("");
  const [searching, setSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState(["Prompt", "Image"]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  const getResult = async (e, flag) => {
    e.preventDefault();
    let url = APIURL;
    setResult("")

    setProgress(0);

    switch (flag) {
      case "Prompt":
        {
          url = APIURL + "/message"
        }
        break;
      case "Image":
        {
          url = APIURL + "/image"
        }
        break;
      default:
        { console.log("error") }
    }
    try {
      setSearching(true);
      const response = await axios.post(url, JSON.stringify({
        prompt: inputValue
      }),
        {
          headers: {
            "Content-Type": "application/json"
          },

          // onDownloadProgress: (progressEvent) => {
          //   const percentCompleted = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
          //   setProgress(percentCompleted);
          //   console.log(`Upload progress: ${percentCompleted}%`);
          //   if (percentage === 100) {
          //     setTimeout(() => {
          //       setSearching(false);
          //     }, 400);
          //   }
          //   clearTimeout()
          // }
        },
      )
      console.log(response.data.message)


      setResult(response.data.message)

      setSearching(false);
    } catch (err) {
      console.log(err);
      setSearching(false);
    }
  }

  return (
    <div>
      <ToggleSwitch setResult={setResult} setInputValue={setInputValue} options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <div className="page-container">
        {
          selectedOption === "Prompt" ?
            <Prompt inputValue={inputValue} setInputValue={setInputValue} result={result} setSearching={setSearching} getResult={getResult} setResult={setResult} setProgress={setProgress} selectedOption={selectedOption} />
            :
            selectedOption === "Image" ?
              <Image inputValue={inputValue} setInputValue={setInputValue} result={result} setSearching={setSearching} getResult={getResult} setResult={setResult} setProgress={setProgress} selectedOption={selectedOption} />
              : null
        }

        {
          searching ?
            <>
              <img style={{ marginTop: '2em', width: '10%', height: '' }} src={Loading} />
              {/* <div className="download-bar-container">
                <div className="download-bar" style={{ width: `${progress}%` }}></div>
              </div> */}
              <h4 style={{ marginTop: '-.2em' }}>Loading...</h4>
            </>
            : null
        }
      </div>
    </div>
  );
}

export default InputField;
