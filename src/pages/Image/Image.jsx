import './Image.css'
import { Form } from "../../components";

const Image = ({ result, setSearching, getResult, setResult, setProgress, selectedOption, inputValue, setInputValue }) => {
    return (
        <>
            <Form result={result} setSearching={setSearching} getResult={getResult} setResult={setResult} setProgress={setProgress} selectedOption={selectedOption} inputValue={inputValue} setInputValue={setInputValue} />

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