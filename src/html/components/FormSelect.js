import React, { useState } from 'react'
import ArrowDown from '../../resources/icons/ArrowDownIcon'

function FormSelect(c) {

    return (
        <div className={`c-form__select-field ${c.class ? c.class : "" }`}>
            <label htmlFor={c.id} className="c-form__label">{c.label}</label>
            <div className="c-selectbox">
                <select className="c-selectbox__select" id={c.id} name={c.id} required={c.required}>
                    <option value="">{c.label}</option>
                    {c.items?.map((option, index) => (
                        <option key={index} value={option.url}>{option.name}</option> 
                    ))}
                </select>
                <ArrowDown />
            </div>
        </div>
    )
}

export default FormSelect