import React from 'react'

function FormInput(c) {
    return (
        <div className={`c-form__textbox-field ${c.class ? c.class : "" }`}>
            <label htmlFor={c.id} className="c-form__label">{c.label}</label>
            <input id={c.id} name={c.id} type={c.type} placeholder={c.placeholder} className="c-form__textbox" required={c.required} />
        </div>
    )
}

export default FormInput