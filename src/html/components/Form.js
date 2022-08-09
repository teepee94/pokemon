import React, { useEffect } from 'react'
import { FEForms } from '../../resources/js/FormsFE'
import FormInput from './FormInput'
import FormCheckbox from './FormCheckbox'
import FormRadio from './FormRadio'
import FormTextarea from './FormTextarea'
import FormSelect from './FormSelect'

function Form(c) {

    useEffect(() => {
		FEForms.Init();
	}, [])

    return (
        <>
        <div className={`c-form c-form--layout ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <div className="c-form__container">
                        <form id="example-form#{c.id}">
                            <fieldset>
                                <legend className="c-form__legend">Example form</legend>
                                {c.errormessage ?
                                    <div className="row">
                                        <div className="c-form__form-validation">
                                            <div className="c-form__validation c-form__validation--error">
                                                <p>Error message would go here</p>
                                            </div>
                                        </div>
                                    </div> : "" }
                                {c.successmessage ?
                                    <div className="row">
                                        <div className="c-form__form-validation">
                                            <div className="c-form__validation c-form__validation--success">
                                                <p>Success message would go here</p>
                                            </div>
                                        </div>
                                    </div> : "" }
                                {!c.successmessage ?
                                    <div className="row">
                                        <div className="c-form__form-field">
                                            <FormInput id={`text${c.id ? c.id : "" }`} label="Text field" type="text" required />
                                        </div>
                                        <div className="c-form__form-field">
                                            <FormInput id={`email${c.id ? c.id : "" }`} label="Email field" type="email" required />
                                        </div>
                                        <div className="c-form__form-field">
                                            <FormTextarea id={`textarea${c.id ? c.id : "" }`} label="Text area" rows="10" required />
                                        </div>
                                        <div className="c-form__form-field">
                                            <fieldset>
                                                <legend className="c-form__subheading">Checkboxes:</legend>
                                                <FormCheckbox id={`checkbox1${c.id ? c.id : "" }`} label="Checkbox 1" />
                                                <FormCheckbox id={`checkbox2${c.id ? c.id : "" }`} label="Checkbox 2" />
                                                <FormCheckbox id={`checkbox3${c.id ? c.id : "" }`} label="Checkbox 3" />
                                            </fieldset>
                                        </div>
                                        <div className="c-form__form-field">
                                            <fieldset>
                                                <legend className="c-form__subheading">Radio buttons</legend>
                                                <FormRadio id={`radio1${c.id ? c.id : "" }`} name="radio" label="Radio option" />
                                                <FormRadio id={`radio2${c.id ? c.id : "" }`} name="radio" label="Radio option" />
                                                <FormRadio id={`radio3${c.id ? c.id : "" }`} name="radio" label="Radio option" />
                                            </fieldset>
                                        </div>
                                        <div className="c-form__form-field">
                                            <FormSelect id={`select1${c.id ? c.id : "" }`} label="Select field" required />
                                        </div>
                                        <div className="c-form__form-field">
                                        <FormCheckbox id={`gdpr${c.id ? c.id : "" }`} label="Please confirm you agree to be contacted via the email address provided and that you agree to our Privacy Policy" required="required" />
                                        </div>
                                        <div className="c-form__form-field">
                                            <div className="g-recaptcha" data-sitekey="6LdUmbYUAAAAAJjFHKFn3DU5ZWk18rXGtexxd2hM"></div>
                                        </div>
                                        <div className="c-form__form-field">
                                            <button type="submit" className="c-btn c-btn--primary">Submit</button>
                                        </div>
                                    </div> : "" }
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        </>
    )
}

export default Form