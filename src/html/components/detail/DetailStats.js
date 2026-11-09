import React from 'react'
import StatBar from '../StatBar'
import { formatName, STAT_LABELS } from '../../../resources/js/utils/format'

// The highest base stat total of any non-legendary pokemon is around 600, so
// scale the total bar against 720 (Arceus) to keep it honest.
const MAX_TOTAL = 720

function DetailStats({ pokemon }) {
    const total = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)

    return (
        <section className="c-panel c-detail__stats" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="c-panel__title">Base stats</h2>
            <dl className="c-detail__stat-list">
                {pokemon.stats.map(({ stat, base_stat: value }) => (
                    <div key={stat.name} className="c-detail__stat-row">
                        <dt>{STAT_LABELS[stat.name] ?? formatName(stat.name)}</dt>
                        <dd><StatBar value={value} /></dd>
                    </div>
                ))}
                <div className="c-detail__stat-row c-detail__stat-row--total">
                    <dt>Total</dt>
                    <dd><StatBar value={total} max={MAX_TOTAL} /></dd>
                </div>
            </dl>
        </section>
    )
}

export default DetailStats
