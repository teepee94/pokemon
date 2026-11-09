import { MAX_BASE_STAT } from "../utils/format"
import "../styles/components/_components.stat-bar.scss"

function StatBar({ value, max = MAX_BASE_STAT }) {
    return (
        <div className="c-stat">
            <span className="c-stat__value">{value}</span>
            <span className="c-stat__track" aria-hidden="true">
                <span className="c-stat__fill" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
            </span>
        </div>
    )
}

export default StatBar
