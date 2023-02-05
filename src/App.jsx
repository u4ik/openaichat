import React, { useState } from "react";
import axios from 'axios'
import { Image, Prompt } from './pages';
import { APIURL } from './helpers'
import Loading from './assets/loading.gif'
import { ToggleSwitch } from "./components";
import "./App.css";


import { Dimmer, Loader, Segment } from 'semantic-ui-react'

function InputField() {

  const [result, setResult] = useState("");
  const [searching, setSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState(["Prompt", "Image"]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const getResult = async (e, flag) => {
    e.preventDefault();
    setError(false);
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
        },
      )
      setResult(response.data.message)
      setSearching(false);
    } catch (err) {
      console.log(err);
      setError(true);
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
              <Image
                error={error}
                setError={setError}
                inputValue={inputValue}
                setInputValue={setInputValue}
                result={result}
                searching={searching}
                setSearching={setSearching}
                getResult={getResult}
                setResult={setResult}
                setProgress={setProgress}
                selectedOption={selectedOption} />
              : null
        }

        {
          searching ?
            <Segment style={{ width: '100%', height: '10em', background: 'transparent' }}>
              <Dimmer active={true}>
                <Loader indeterminate>Loading</Loader>
              </Dimmer>
            </Segment>
            : null
        }
      </div>
    </div>
  );
}

export default InputField;
