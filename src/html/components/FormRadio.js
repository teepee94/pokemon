import React from 'react'

function FormRadio(c) {
    return (
        <div className={`c-form__radio-field ${c.class ? c.class : "" }`}>
            <input type="radio" id={c.id} name={c.id} className="c-form__radio" checked={c.checked} />
            <label htmlFor={c.id} className="c-form__label">{c.label}</label>
        </div>
    )
}

export default FormRadio