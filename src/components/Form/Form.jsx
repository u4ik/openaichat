import React, { useState } from 'react'
import './Form.css'

const Form = (props) => {

    return (
        <form onSubmit={(e) => props.getResult(e, props.selectedOption)}>
            <input
                autoComplete='on'
                required={true}
                placeholder={props.selectedOption === "Prompt" ? "How do I plant a tree?" : "Cat"}
                className="input-field"
                value={props.inputValue}
                onChange={e => props.setInputValue(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '.5em', justifyContent: 'center', marginBottom: '1em' }}>
                <button className="submit_button" disabled={!props.inputValue} >Submit</button>
                {
                    props.result ?
                        <button
                            className="clear_button" type='button' onClick={() => {
                                props.setInputValue("");
                                props.setResult("");
                                props.setProgress(0);
                                props.setSearching(false);
                            }
                            }>X</button>
                        : null}
            </div>
        </form>
    )
}

export default Form;