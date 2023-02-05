import './Image.css';
import { Form, ToggleSwitch } from "../../components";
import { useState } from 'react';
import axios from 'axios'
import { APIURL } from '../../helpers'
const Image = ({ result, setSearching, getResult, setResult, setProgress, selectedOption, inputValue, setInputValue }) => {
    const [options, setOptions] = useState(["Search", "Alter"]);
    const [imgOption, setImgOption] = useState(options[0]);
    const [imageSelected, setImageSelected] = useState();

    /* TODO : Handle different selections for toggle switch. May just create a new one??
    */
    /* TODO : Allow images to be chosen to be altered from initial img results page
    */

    const onSubmit = async (e) => {
        e.preventDefault();

        const file = document.getElementById("upload");
        const formData = new FormData();
        formData.append("upload", file.files[0])

        let url = APIURL + '/alter_image';
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            })
            const result = await response.json();
            setResult(result.res);
        } catch (err) {
            console.log(err);
        }
    }

    const onChange = () => {
        let img = document.getElementById("upload").files[0];
        // Check if img has been selected
        if (img) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Storing base64 string in state
                setImageSelected(e.target.result)
            }
            reader.readAsDataURL(img)
        }
    }

    return (
        <>
            <ToggleSwitch options={options} imgOption={imgOption} setImgOption={setImgOption} />
            {
                imgOption === 'Search' ?
                    <Form result={result} setSearching={setSearching} getResult={getResult} setResult={setResult} setProgress={setProgress} selectedOption={selectedOption} inputValue={inputValue} setInputValue={setInputValue} />
                    :
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} style={{ color: 'white' }} type='file' id='upload' accept=".png, .jpg, .jpeg" />
                        <button type='submit'>Upload</button>
                    </form>

            }
            <div className="image-container">
                {result ? result.map((i, idx) => {
                    return (
                        <div key={idx}>
                            <a href={i.url} target="_blank">
                                <img className="image" src={i.url} />
                            </a>
                        </div>
                    )
                }) : null}
            </div>
        </>
    )
}

export default Image;