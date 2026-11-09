import { formatName } from "../../utils/format"

// PokeAPI gender_rate is the chance of being female in eighths; -1 is genderless.
function GenderRatio({ rate }) {
    if (rate === -1) return <span>Genderless</span>

    const female = (rate / 8) * 100
    const male = 100 - female

    return (
        <div className="c-gender">
            <span className="c-gender__bar" aria-hidden="true">
                <span className="c-gender__male" style={{ width: `${male}%` }} />
            </span>
            <span className="c-gender__labels">
                <span>♂ {male}%</span>
                <span>♀ {female}%</span>
            </span>
        </div>
    )
}

function DetailAbout({ pokemon, species }) {
    return (
        <section className="c-panel c-detail__about" aria-labelledby="about-heading">
            <h2 id="about-heading" className="c-panel__title">
                About
            </h2>

            <h3 className="c-panel__subtitle">Abilities</h3>
            <ul className="c-detail__abilities">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                    <li key={ability.name} className="c-detail__ability">
                        {formatName(ability.name)}
                        {is_hidden && <span className="c-detail__ability-note">Hidden</span>}
                    </li>
                ))}
            </ul>

            <h3 className="c-panel__subtitle">Training</h3>
            <dl className="c-detail__facts">
                <div>
                    <dt>Base exp.</dt>
                    <dd>{pokemon.base_experience ?? "—"}</dd>
                </div>
                <div>
                    <dt>Catch rate</dt>
                    <dd>{species?.capture_rate ?? "—"}</dd>
                </div>
                <div>
                    <dt>Growth rate</dt>
                    <dd>{species ? formatName(species.growth_rate.name) : "—"}</dd>
                </div>
            </dl>

            <h3 className="c-panel__subtitle">Breeding</h3>
            <dl className="c-detail__facts">
                <div className="c-detail__facts-wide">
                    <dt>Gender</dt>
                    <dd>{species ? <GenderRatio rate={species.gender_rate} /> : "—"}</dd>
                </div>
                <div>
                    <dt>Egg groups</dt>
                    <dd>
                        {species
                            ? species.egg_groups.map((group) => formatName(group.name)).join(", ") || "—"
                            : "—"}
                    </dd>
                </div>
                <div>
                    <dt>Habitat</dt>
                    <dd>{species?.habitat ? formatName(species.habitat.name) : "—"}</dd>
                </div>
            </dl>
        </section>
    )
}

export default DetailAbout
