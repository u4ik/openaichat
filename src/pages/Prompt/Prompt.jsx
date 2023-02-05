import { useState } from 'react';
import { Form } from "../../components";

const Prompt = ({ result, setSearching, getResult, setResult, setProgress, selectedOption, inputValue, setInputValue }) => {

    return (
        <>
            <Form result={result} setSearching={setSearching} getResult={getResult} setResult={setResult} setProgress={setProgress} selectedOption={selectedOption} inputValue={inputValue} setInputValue={setInputValue} />

            <p className="" style={{ fontSize: '1.4em', lineHeight: '1.4em', marginTop: 0, color: 'white' }}>{result}</p>
        </>
    )
}


export default Prompt;