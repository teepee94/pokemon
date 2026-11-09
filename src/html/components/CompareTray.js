import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearCompare, removeFromCompare, selectCompare } from '../../resources/js/redux/compareSlice'
import { formatName, getSpriteUrl, MAX_COMPARE } from '../../resources/js/utils/format'
import "../../resources/sass/components/_components.compare-tray.scss"

// Floating bar that shows the current compare selection on browse pages,
// so users always know what they've picked and can jump straight to it.
function CompareTray() {
    const dispatch = useDispatch()
    const compare = useSelector(selectCompare)

    if (compare.length === 0) return null

    const emptySlots = MAX_COMPARE - compare.length

    return (
        <>
        {/* Reserves space so the fixed tray never covers the end of the page. */}
        <div className="c-compare-tray__spacer" aria-hidden="true" />
        <aside className="c-compare-tray" aria-label="Compare selection">
            <div className="c-compare-tray__inner">
                <ul className="c-compare-tray__slots">
                    {compare.map(({ name, id }) => (
                        <li key={name} className="c-compare-tray__slot">
                            <img src={getSpriteUrl(id)} alt="" width="48" height="48" />
                            <button
                                type="button"
                                className="c-compare-tray__remove"
                                onClick={() => dispatch(removeFromCompare(name))}
                                aria-label={`Remove ${formatName(name)} from compare`}
                            >
                                <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M6 6l8 8M14 6l-8 8" /></svg>
                            </button>
                        </li>
                    ))}
                    {Array.from({ length: emptySlots }, (_, index) => (
                        <li key={index} className="c-compare-tray__slot c-compare-tray__slot--empty" aria-hidden="true" />
                    ))}
                </ul>
                <p className="c-compare-tray__text" aria-live="polite">
                    <strong>{compare.length}</strong> of {MAX_COMPARE} selected
                </p>
                <div className="c-compare-tray__actions">
                    <button type="button" className="c-compare-tray__clear" onClick={() => dispatch(clearCompare())}>
                        Clear
                    </button>
                    <Link to="/compare" className="c-btn c-btn--primary c-compare-tray__cta">
                        Compare{compare.length > 1 ? ` ${compare.length}` : ""}
                    </Link>
                </div>
            </div>
        </aside>
        </>
    )
}

export default CompareTray
