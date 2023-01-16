import React, { useState } from 'react'

import './Form.css'

const Form = (props) => {


    return (
        <form onSubmit={props.getResult}>
            <input
                placeholder='How to plant a tree?'
                className="input-field"
                value={props.inputValue}
                onChange={e => props.setInputValue(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '.5em', justifyContent: 'center' }}>

                <button className="submit_button" >Submit</button>

                {
                    props.result ?
                        <button
                            className="clear_button" type='button' onClick={() => {
                                props.setInputValue("")
                                props.setResult("")
                                props.setProgress(0)
                            }
                            }>X</button>
                        : null}
            </div>


        </form>


    )
}

export default Form;
