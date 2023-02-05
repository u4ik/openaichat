import './ToggleSwitch.css';

const ToggleSwitch = ({ options, selectedOption = '', setSelectedOption = '', setInputValue = '', setResult = '', imgOption = '', setImgOption = '' }) => {

    const handleOptionChange = (option) => {
        setSelectedOption ? setSelectedOption(option) : setImgOption(option);
        setInputValue ? setInputValue("") : null;
        setResult ? setResult("") : null;
    }
    return (
        <div className="react-switch-container">
            {options.map((option, idx) => (
                <div key={idx}>
                    <input
                        type="radio"
                        id={option}
                        name="react-switch"
                        value={option}
                        checked={
                            selectedOption ? selectedOption === option
                                : imgOption ? imgOption === option : null

                        }
                        onChange={() => handleOptionChange(option)}
                        className="react-switch-radio"
                    />
                    <label htmlFor={option} className="react-switch-label">
                        {option}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default ToggleSwitch