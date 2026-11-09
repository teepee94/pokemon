import React, { useMemo, useRef, useState } from 'react'
import { formatName, groupMoves, MOVE_METHODS } from '../../../resources/js/utils/format'

// Moves grouped into tabs by how they're learned, with a search box. The list
// scrolls inside the panel so 100+ moves never stretch the page.
function DetailMoves({ pokemon }) {
    const { groups, versionLabel, total } = useMemo(() => groupMoves(pokemon.moves), [pokemon.moves])
    const tabs = MOVE_METHODS.filter(({ key }) => groups[key].length > 0)

    const [activeKey, setActiveKey] = useState(tabs[0]?.key)
    const [query, setQuery] = useState("")
    const tabRefs = useRef({})

    if (tabs.length === 0) return null

    // Fall back to the first tab if this pokemon has no moves for the active one.
    const active = groups[activeKey] ? activeKey : tabs[0].key
    const search = query.trim().toLowerCase().replace(/\s+/g, "-")
    const moves = groups[active].filter(move => move.name.includes(search))
    const isLevelUp = active === "level-up"

    // Arrow keys move between tabs, as per the WAI-ARIA tabs pattern.
    const onTabKeyDown = (event) => {
        const index = tabs.findIndex(tab => tab.key === active)
        const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
        if (!step) return

        event.preventDefault()
        const next = tabs[(index + step + tabs.length) % tabs.length].key
        setActiveKey(next)
        tabRefs.current[next]?.focus()
    }

    return (
        <section className="c-panel c-detail__moves" aria-labelledby="moves-heading">
            <div className="c-detail__moves-header">
                <div>
                    <h2 id="moves-heading" className="c-panel__title">
                        Moves <span className="c-panel__count">{total}</span>
                    </h2>
                    <p className="c-detail__moves-version">As learned in Pokémon {versionLabel}</p>
                </div>
                <div className="c-search">
                    <label htmlFor="move-search" className="u-visually-hide">Search moves</label>
                    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="9" cy="9" r="5.5" /><path d="M13 13l4 4" /></svg>
                    <input
                        id="move-search"
                        type="search"
                        className="c-search__input"
                        placeholder="Search moves"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        autoComplete="off"
                    />
                </div>
            </div>

            <div className="c-tabs" role="tablist" aria-label="How moves are learned">
                {tabs.map(({ key, label }) => (
                    <button
                        key={key}
                        ref={element => { tabRefs.current[key] = element }}
                        type="button"
                        role="tab"
                        id={`moves-tab-${key}`}
                        aria-selected={active === key}
                        aria-controls="moves-panel"
                        tabIndex={active === key ? 0 : -1}
                        className="c-tabs__tab"
                        onClick={() => setActiveKey(key)}
                        onKeyDown={onTabKeyDown}
                    >
                        {label}
                        <span className="c-tabs__count">{groups[key].length}</span>
                    </button>
                ))}
            </div>

            <div
                id="moves-panel"
                role="tabpanel"
                aria-labelledby={`moves-tab-${active}`}
                className="c-detail__moves-panel"
                tabIndex={0}
            >
                {moves.length === 0 ? (
                    <p className="c-detail__moves-empty">No moves match “{query}”.</p>
                ) : isLevelUp ? (
                    <table className="c-detail__moves-table">
                        <thead>
                            <tr>
                                <th scope="col">Level</th>
                                <th scope="col">Move</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moves.map(move => (
                                <tr key={move.name}>
                                    <td className="c-detail__move-level">{move.level === 0 ? "Evo" : move.level}</td>
                                    <td>{formatName(move.name)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <ul className="c-detail__moves-list">
                        {moves.map(move => <li key={move.name}>{formatName(move.name)}</li>)}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default DetailMoves
