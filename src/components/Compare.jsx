import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { clearCompare, removeFromCompare, selectCompare } from "../features/compare/compareSlice"
import { usePokemonList } from "../features/pokemon/usePokemonList"
import {
    formatHeight,
    formatId,
    formatName,
    formatWeight,
    getArtworkUrl,
    MAX_COMPARE,
    STAT_LABELS,
} from "../utils/format"
import TypeBadge from "./TypeBadge"
import StatBar from "./StatBar"
import "../styles/components/_components.compare.scss"

const getStat = (pokemon, statName) =>
    pokemon.stats.find((stat) => stat.stat.name === statName)?.base_stat ?? 0

const getTotal = (pokemon) => pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)

const getMoveNames = (pokemon) => pokemon.moves.map((move) => move.move.name).sort()

function Section({ title, span }) {
    return (
        <tr className="c-compare__section">
            <th scope="colgroup" colSpan={span}>
                {title}
            </th>
        </tr>
    )
}

// One row of the table: a label plus one cell per pokemon, with optional
// "best value" highlighting when comparing numbers.
function Row({ label, pokemon, getValue, render, highlightBest = false, emptySlots }) {
    const values = pokemon.map(getValue)
    const best = Math.max(...values)
    const showBest = highlightBest && pokemon.length > 1 && values.some((value) => value !== best)

    return (
        <tr>
            <th scope="row" className="c-compare__label">
                {label}
            </th>
            {pokemon.map((item, index) => {
                const isBest = showBest && values[index] === best
                return (
                    <td key={item.name} className={isBest ? "is-best" : undefined}>
                        {render ? render(item, values[index], isBest) : values[index]}
                        {isBest && <span className="u-visually-hide"> (highest)</span>}
                    </td>
                )
            })}
            {emptySlots > 0 && <td colSpan={emptySlots} className="c-compare__empty-cell" />}
        </tr>
    )
}

function Compare() {
    const dispatch = useDispatch()
    const compare = useSelector(selectCompare)
    const names = useMemo(() => compare.map(({ name }) => name), [compare])

    // One cache entry per pokemon (shared with the detail page), so removing
    // one never refetches the rest.
    const { results, retry } = usePokemonList(names)
    const isError = results.some((result) => result.isError)

    if (compare.length === 0) {
        return (
            <section className="c-compare">
                <div className="container">
                    <div className="c-compare__empty">
                        <h2 className="c-compare__empty-title">Nothing to compare yet</h2>
                        <p className="c-compare__empty-text">
                            Use the <strong>Compare</strong> button on any Pokémon to add it here. You can
                            compare up to {MAX_COMPARE} side by side.
                        </p>
                        <Link to="/" className="c-btn c-btn--primary">
                            Browse Pokémon
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    // In the order the user picked them; anything still loading is left out.
    const pokemon = results.map((result) => result.data).filter(Boolean)

    if (isError) {
        return (
            <section className="c-compare">
                <div className="container">
                    <div className="c-compare__empty" role="alert">
                        <h2 className="c-compare__empty-title">Something went wrong</h2>
                        <p className="c-compare__empty-text">
                            We couldn't load these Pokémon. Please check your connection and try again.
                        </p>
                        <button type="button" className="c-btn c-btn--primary" onClick={retry}>
                            Try again
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    // Covers the first render too, before the fetch effect has started.
    if (pokemon.length === 0) {
        return (
            <section className="c-compare">
                <div className="container">
                    <p className="c-compare__loading" aria-live="polite">
                        Loading comparison…
                    </p>
                </div>
            </section>
        )
    }

    const emptySlots = MAX_COMPARE - pokemon.length
    const columnCount = 1 + pokemon.length + emptySlots
    const statNames = pokemon[0].stats.map((stat) => stat.stat.name)
    const moveLists = pokemon.map(getMoveNames)
    const sharedMoves = moveLists[0].filter((move) => moveLists.every((list) => list.includes(move)))
    const rowProps = { pokemon, emptySlots }

    return (
        <section className="c-compare" aria-busy={pokemon.length < compare.length}>
            <div className="container">
                <div className="c-compare__toolbar">
                    <p className="c-compare__count">
                        Comparing <strong>{pokemon.length}</strong> of {MAX_COMPARE}
                    </p>
                    <button
                        type="button"
                        className="c-compare__clear"
                        onClick={() => dispatch(clearCompare())}
                    >
                        Clear all
                    </button>
                </div>

                <div
                    className="c-compare__scroller"
                    role="region"
                    aria-label="Pokémon comparison"
                    tabIndex={0}
                >
                    <table className="c-compare__table">
                        <caption className="u-visually-hide">
                            Side-by-side comparison of the selected Pokémon
                        </caption>
                        <colgroup>
                            <col className="c-compare__col-label" />
                            {Array.from({ length: pokemon.length + emptySlots }, (_, index) => (
                                <col key={index} className="c-compare__col" />
                            ))}
                        </colgroup>
                        <thead>
                            <tr>
                                <td className="c-compare__label c-compare__corner" />
                                {pokemon.map((item) => (
                                    <th key={item.name} scope="col" className="c-compare__head">
                                        <button
                                            type="button"
                                            className="c-compare__remove"
                                            onClick={() => dispatch(removeFromCompare(item.name))}
                                            aria-label={`Remove ${formatName(item.name)}`}
                                            title="Remove"
                                        >
                                            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                                                <path d="M5 5l10 10M15 5L5 15" />
                                            </svg>
                                        </button>
                                        <div className="c-compare__media">
                                            <img
                                                src={getArtworkUrl(item.id)}
                                                alt=""
                                                width="160"
                                                height="160"
                                            />
                                        </div>
                                        <span className="c-compare__number">{formatId(item.id)}</span>
                                        <Link to={`/pokemon/${item.name}`} className="c-compare__name">
                                            {formatName(item.name)}
                                        </Link>
                                        <div className="c-compare__types">
                                            {item.types.map(({ type }) => (
                                                <TypeBadge key={type.name} type={type.name} />
                                            ))}
                                        </div>
                                    </th>
                                ))}
                                {Array.from({ length: emptySlots }, (_, index) => (
                                    <td key={index} className="c-compare__head c-compare__head--empty">
                                        <Link to="/" className="c-compare__add">
                                            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                                                <path d="M10 4v12M4 10h12" />
                                            </svg>
                                            Add Pokémon
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            <Section title="Overview" span={columnCount} />
                            <Row
                                label="Height"
                                getValue={(item) => item.height}
                                render={(item) => formatHeight(item.height)}
                                {...rowProps}
                            />
                            <Row
                                label="Weight"
                                getValue={(item) => item.weight}
                                render={(item) => formatWeight(item.weight)}
                                {...rowProps}
                            />
                            <Row
                                label="Base exp."
                                getValue={(item) => item.base_experience ?? 0}
                                highlightBest
                                {...rowProps}
                            />
                            <Row
                                label="Abilities"
                                getValue={(item) => item.abilities.length}
                                render={(item) => (
                                    <ul className="c-compare__chips">
                                        {item.abilities.map(({ ability, is_hidden }) => (
                                            <li key={ability.name} className="c-compare__chip">
                                                {formatName(ability.name)}
                                                {is_hidden && (
                                                    <span className="c-compare__chip-note">Hidden</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {...rowProps}
                            />

                            <Section title="Base stats" span={columnCount} />
                            {statNames.map((statName) => (
                                <Row
                                    key={statName}
                                    label={STAT_LABELS[statName] ?? formatName(statName)}
                                    getValue={(item) => getStat(item, statName)}
                                    render={(item, value) => <StatBar value={value} />}
                                    highlightBest
                                    {...rowProps}
                                />
                            ))}
                            <Row
                                label="Total"
                                getValue={getTotal}
                                render={(item, value) => <span className="c-compare__total">{value}</span>}
                                highlightBest
                                {...rowProps}
                            />

                            <Section title="Moves" span={columnCount} />
                            <Row label="Moves learned" getValue={(item) => item.moves.length} {...rowProps} />
                            {pokemon.length > 1 && (
                                <tr>
                                    <th scope="row" className="c-compare__label">
                                        In common
                                    </th>
                                    <td colSpan={pokemon.length}>
                                        {sharedMoves.length > 0 ? (
                                            <details className="c-compare__details">
                                                <summary>{sharedMoves.length} moves shared by all</summary>
                                                <ul className="c-compare__moves c-compare__moves--wide">
                                                    {sharedMoves.map((move) => (
                                                        <li key={move}>{formatName(move)}</li>
                                                    ))}
                                                </ul>
                                            </details>
                                        ) : (
                                            <span className="c-compare__muted">No moves in common</span>
                                        )}
                                    </td>
                                    {emptySlots > 0 && (
                                        <td colSpan={emptySlots} className="c-compare__empty-cell" />
                                    )}
                                </tr>
                            )}
                            <Row
                                label="Full move list"
                                getValue={(item) => item.moves.length}
                                render={(item, value) => (
                                    <details className="c-compare__details">
                                        <summary>View {value} moves</summary>
                                        <ul className="c-compare__moves">
                                            {getMoveNames(item).map((move) => (
                                                <li key={move}>{formatName(move)}</li>
                                            ))}
                                        </ul>
                                    </details>
                                )}
                                {...rowProps}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Compare
