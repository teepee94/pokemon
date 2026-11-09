import Masthead from "../components/Masthead"
import Compare from "../components/Compare"

function ComparePage() {
    return (
        <>
            <title>Compare · Pokédex</title>
            <Masthead
                eyebrow="Compare"
                title="Side by side"
                summary="Stats, abilities and moves lined up in one table. The highest value in each row is highlighted."
            />
            <Compare />
        </>
    )
}

export default ComparePage
