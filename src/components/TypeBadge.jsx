import "../styles/components/_components.type-badge.scss"
import { formatName } from "../utils/format"

function TypeBadge({ type }) {
    return <span className={`c-type-badge c-type-badge--${type}`}>{formatName(type)}</span>
}

export default TypeBadge
