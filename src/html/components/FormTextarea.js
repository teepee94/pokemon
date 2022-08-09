import React from 'react'

function FormTextarea(c) {
    return (
        <div className={`c-form__textarea-field ${c.class ? c.class : "" }`}>
            <label htmlFor={c.id} className="c-form__label">{c.label}</label>
            <textarea id={c.id} name={c.id} placeholder={c.placeholder} rows={c.rows} className="c-form__textarea" required={c.required}></textarea>
        </div>
    )
}

export default FormTextarea