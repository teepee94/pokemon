import "../styles/components/_components.masthead.scss"

function Masthead({ title, summary, eyebrow }) {
    return (
        <header className="c-masthead">
            <div className="container">
                <div className="c-masthead__inner">
                    {eyebrow && <p className="c-masthead__eyebrow">{eyebrow}</p>}
                    <h1 className="c-masthead__title">{title}</h1>
                    {summary && <p className="c-masthead__summary">{summary}</p>}
                </div>
            </div>
        </header>
    )
}

export default Masthead
