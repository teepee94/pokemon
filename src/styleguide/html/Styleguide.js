import React, { useEffect } from 'react'
import { Helmet } from "react-helmet"
import { FEForms } from "../../resources/js/FormsFE"
import FormInput from "../../html/components/FormInput"
import FormTextarea from "../../html/components/FormTextarea"
import FormSelect from "../../html/components/FormSelect"
import FormCheckbox from "../../html/components/FormCheckbox"
import FormRadio from "../../html/components/FormRadio"
import ArrowDownIcon from "../../resources/icons/ArrowDownIcon"
import ArrowLeftIcon from "../../resources/icons/ArrowLeftIcon"
import ArrowRightIcon from "../../resources/icons/ArrowRightIcon"
import ArrowUpIcon from "../../resources/icons/ArrowUpIcon"
import CloseIcon from "../../resources/icons/CloseIcon"
import SearchIcon from "../../resources/icons/SearchIcon"

function Styleguide(c) {

	useEffect(() => {
		FEForms.Init();
	}, [])
	
    return (
      	<>
		<Helmet>
			<title>Styleguide</title>
		</Helmet>
		<div className="container" style={{marginBottom: "50px"}}>
			<div className="row">
				<div className="style-col">
					<h1 className="heading-h0" style={{color: c.styleguideTextColor}}>Styleguide</h1>
				</div>
			</div>
			<div className="row">
				<div className="style-col">
					<h1 className="heading-h3" style={{color: c.styleguideTextColor}}>Colours</h1>
				</div>
			</div>
			<div className="row">
				<div className="style-col">
					<div className="row">
						<div className="style-color-container"><div className="style-color style-color--primary"><p>Primary</p></div></div>
						<div className="style-color-container"><div className="style-color style-color--secondary"><p>Secondary</p></div></div>
					</div>
					<div className="row">
						<div className="style-color-container"><div className="style-color style-color--grey-dark"><p>Grey Dark</p></div></div>
						<div className="style-color-container"><div className="style-color style-color--grey"><p>Grey</p></div></div>
						<div className="style-color-container"><div className="style-color style-color--grey-light"><p>Grey Light</p></div></div>
					</div>
					<div className="row">
						<div className="style-color-container"><div className="style-color style-color--validation-error"><p>Validation Error</p></div></div>
						<div className="style-color-container"><div className="style-color style-color--validation-success"><p>Validation Success</p></div></div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="style-col">
					<h1 className="heading-h0" style={{color: c.styleguideTextColor}}>Typography</h1>
				</div>
			</div>
			<div className="row">
				<div className="style-col">
					<h1 className="heading-h0">H0<br/>Lorem ipsum dolor sit amet</h1>
					<span className="style-type">Font: Helvetica Neue Bold | Line height: 60px | Letter spacing: -1px</span>
					<br/><br/><br/><br/><br/><br/><br/>
					<h1 className="heading-h1">H1<br/>Lorem ipsum dolor sit amet</h1>
					<span className="style-type">Font: Helvetica Neue Bold | Line height: 48px | Letter spacing: -0.5px</span>
					<br/><br/><br/><br/><br/><br/><br/>
					<h2 className="heading-h2">H2<br/>Lorem ipsum dolor sit amet</h2>
					<span className="style-type">Font: Helvetica Neue Bold | Line height: 38px | Letter spacing: -0.4px</span>
					<br/><br/><br/><br/><br/><br/><br/>
					<h3 className="heading-h3">H3<br/>Lorem ipsum dolor sit amet</h3>
					<span className="style-type">Font: Helvetica Neue Bold | Line height: 32px| Letter spacing: -0.1px</span>
					<br/><br/><br/><br/><br/><br/><br/>
					<h4 className="heading-h4">H4<br/>Lorem ipsum dolor sit amet</h4>
					<span className="style-type">Font: Helvetica Neue Medium | Line height: 28px | Letter spacing: Normal</span>
					<br/><br/><br/><br/><br/><br/><br/>
					<h5 className="heading-h5">H5<br/>Lorem ipsum dolor sit amet</h5>
					<span className="style-type">Font: Helvetica Neue Medium | Line height: 24px | Letter spacing: Normal</span>
					<br/><br/><br/><br/><br/><br/><br/>
					<h6 className="heading-h6">H6<br/>Lorem ipsum dolor sit amet</h6>
					<span className="style-type">Font: Helvetica Neue Medium | Line height: 20px | Letter spacing: Normal</span>
					<br/><br/><br/><br/><br/><br/><br/>
					<p className="para-large">Content Large<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a.</p>
					<span className="style-type">Font: Helvetica Neue Roman | Line height: 160% | Letter spacing: Normal</span>
					<br/><br/><br/><br/><br/><br/><br/>
					<p>Content<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a.</p>
					<span className="style-type">Font: Helvetica Neue Roman | Line height: 160% | Letter spacing: Normal</span>
					<br/><br/><br/><br/><br/><br/><br/>
					<p className="para-small">Content Small<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a.</p>
					<span className="style-type">Font: Helvetica Neue Roman | Line height: 160% | Letter spacing: Normal</span>
				</div>
			</div>
			<div className="row">
				<div className="style-col">
					<h1 className="heading-h0" style={{color: c.styleguideTextColor}}>Icons</h1>
				</div>
			</div>
			<div className="row">
				<div className="style-col">
					<ArrowDownIcon />
					<ArrowLeftIcon />
					<ArrowRightIcon />
					<ArrowUpIcon />				
					<CloseIcon />
					<SearchIcon />
				</div>
			</div>
			<div className="row">
				<div className="style-col">
					<h1 className="heading-h0" style={{color: c.styleguideTextColor}}>Buttons</h1>
				</div>
			</div>
			<div className="row">
				<div className="style-col">
					<button className="c-btn">Regular button</button>
					<br /><br />
					<button className="c-btn c-btn--primary">Primary button</button>
				</div>
			</div>
			<div className="row">
				<div className="style-col">
					<h1 className="heading-h0" style={{color: c.styleguideTextColor}}>Form</h1>
				</div>
			</div>
			<div className="row">
				<form className="styleguide-form c-form">
					<fieldset className="row">
						<legend className="c-form__legend">This is a form</legend>
						<div className="styleguide-form__form-field">
							<FormInput id="input" label="Input field" placeholder="Placeholder" type="text" required />
						</div>
						<div className="styleguide-form__form-field">
							<FormTextarea id="textarea" label="Textarea field" placeholder="Placeholder" rows="10" required />
						</div>
						<div className="styleguide-form__form-field">
							<FormSelect id="select" label="Select field" required />
						</div>
						<fieldset className="styleguide-form__form-field">
							<legend className="c-form__subheading">Radio field</legend>
							<FormRadio id="radio1" name="radio" label="Radio option" checked />
							<FormRadio id="radio2" name="radio" label="Radio option" />
						</fieldset>
						<fieldset className="styleguide-form__form-field">
							<legend className="c-form__subheading">Checkbox field</legend>
							<FormCheckbox id="checkbox1" label="Checkbox option" checked />
							<FormCheckbox id="checkbox2" label="Checkbox option" />
						</fieldset>
						<div className="styleguide-form__validation">
							<div className="c-form__validation c-form__validation--error">
								<p>Error message</p>
								<ul>
									<li>Error message list item</li>
									<li>Error message list item</li>
								</ul>
							</div>
						</div>
						<div className="styleguide-form__validation">
							<div className="c-form__validation c-form__validation--success">
								<p>Success message</p>
								<ul>
									<li>Success message list item</li>
									<li>Success message list item</li>
								</ul>
							</div>
						</div>
						<div className="styleguide-form__form-field">
							<input type="submit" value="Submit" className="c-btn" />
						</div>
					</fieldset>
				</form>
			</div>
		</div>
		</>
    )
}

export default Styleguide