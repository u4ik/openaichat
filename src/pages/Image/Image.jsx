import './Image.css';
import { Form, ToggleSwitch } from "../../components";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import { APIURL } from '../../helpers';
const Image = ({ error, setError, result, searching, setSearching, getResult, setResult, setProgress, selectedOption, inputValue, setInputValue }) => {
    const [options, setOptions] = useState(["Search", "Alter"]);
    const [imgOption, setImgOption] = useState(options[0]);
    const [imgData, setImgData] = useState('');
    const [disableUpload, setDisableUpload] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');

    const imgRef = useRef();

    const onSubmit = async (e) => {
        e.preventDefault();
        setSearching(true);
        setError(false);
        let url = APIURL + '/alter_image';
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: imgData
            })
            const result = await response.json();
            setSearching(false);
            setResult(result.res);
            setImgData('');
        } catch (err) {
            setError(true);
            setImgData('');
        };
    };

    const onChange = (e) => {
        const formData = new FormData();
        const file = imgRef.current;
        formData.append("upload", file.files[0]);

        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]))
            setDisableUpload(false)
        }
        setImgData(formData);
    };

    return (
        <>
            <ToggleSwitch setSelectedImage={setSelectedImage} options={options} imgOption={imgOption} setImgOption={setImgOption} />
            {
                imgOption === 'Search' ?
                    <Form result={result} setSearching={setSearching} getResult={getResult} setResult={setResult} setProgress={setProgress} selectedOption={selectedOption} inputValue={inputValue} setInputValue={setInputValue} />
                    :
                    <form onSubmit={onSubmit} style={{ marginTop: '1em' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1em' }}>
                            {
                                selectedImage ?
                                    <img src={selectedImage} style={{ width: 'auto', height: '10em', borderRadius: '1em' }} />
                                    : null
                            }

                            <input ref={imgRef} onChange={onChange} style={{ color: 'white' }} type='file' id='upload' accept=".png, .jpg, .jpeg" />
                            <button type='submit' disabled={disableUpload} style={{ cursor: disableUpload ? 'default' : 'pointer', marginBottom: '1em' }}>Upload</button>
                        </div>
                    </form>
            }

            <div className="image-container">
                {result && !searching ? result.map((i, idx) => {
                    return (
                        <div key={idx}>
                            {
                                !error ?
                                    <a href={i.url} target="_blank">
                                        <img className="image" src={i.url} />
                                    </a> : null
                            }
                        </div>
                    )
                }) : null}
            </div>
        </>
    )
}

export default Image;