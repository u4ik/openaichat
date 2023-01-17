import './ToggleSwitch.css';

const ToggleSwitch = ({ options, selectedOption, setSelectedOption, setInputValue, setResult }) => {

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setInputValue("");
        setResult("");
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
                        checked={selectedOption === option}
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