import React from 'react'

function FormCheckbox(c) {
    return (
        <div className={`c-form__checkbox-field ${c.class ? c.class : "" }`}>
            <div className="c-form__group">
                <input type="checkbox" id={c.id} name={c.id} className="c-form__checkbox" checked={c.checked} required={c.required} />
                <label htmlFor={c.id} className="c-form__label">{c.label}</label>
            </div>
        </div>
    )
}

export default FormCheckbox