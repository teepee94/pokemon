import React from 'react'

function CmsContent() {
    return (
        <>
        <h1>H1 Heading</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a.</p>

        <h2>H2 Heading</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a.</p>

        <h3>H3 Heading</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a.</p>

        <h4>H4 Heading</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a.</p>

        <h5>H5 Heading</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a.</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae. In egestas faucibus magna, vel malesuada mi tempor a.</p>

        <img src="/resources/images/test/placeholder.png" alt="" />

        <ul>
            <li>This is a list item in an unordered list</li>
            <li>An unordered list is a list in which the sequence of items is not important
                <ul>
                    <li>This is a list item in an unordered list</li>
                    <li>An unordered list is a list in which the sequence of items is not important</li>
                </ul>
            </li>
            <li>This is a list item in an unordered list</li>
            <li>An unordered list is a list in which the sequence of items is not important</li>
        </ul>

        <ol>
            <li>This is a list item in an ordered list</li>
            <li>An ordered list is a list in where the sequence of items is important</li>
        </ol>

        <p><span className="u-text-big">Big text</span></p>

        <p><span className="u-text-small">Small text</span></p>

        <p><strong>Bold text</strong></p>

        <p><em>Italic text</em></p>

        <p className="footnote">Footnote text which is the smallest text that can be used</p>

        <p><a href="">Anchor link</a></p>

        <p>This text contains <sub>subscript</sub> text.</p>

        <p>This text contains <sup>superscript</sup> text.</p>

        <p><strong className="u-highlight-primary">Primary brand colour highlight text</strong></p>
        <p className="u-highlight-primary">Primary brand colour highlight text</p>

        <p><strong className="u-highlight-secondary">Secondary brand colour highlight text</strong></p>
        <p className="u-highlight-secondary">Secondary brand colour highlight text</p>

        <blockquote>
            <p>This is a blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit purus ex, eget molestie quam rutrum vitae.</p>
        </blockquote>

        <table>
            <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Lorem ipsum dolor sit amet</td>
                <td>Lorem ipsum</td>
                <td>Lorem ipsum dolor sit</td>
            </tr>
            <tr>
                <td>Lorem ipsum</td>
                <td>Lorem ipsum dolor sit</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            </tr>
            <tr>
                <td>Lorem ipsum dolor sit amet</td>
                <td>Lorem ipsum</td>
                <td>Lorem ipsum dolor sit</td>
            </tr>
            </tbody>
        </table>
        </>
    )
}

export default CmsContent