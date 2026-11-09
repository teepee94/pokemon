import { useDispatch, useSelector } from "react-redux"
import { addToCompare, removeFromCompare, selectCompare, selectIsCompareFull } from "./compareSlice"
import { formatName, MAX_COMPARE } from "../../utils/format"

// Everything a "compare" button needs: whether this pokemon is selected,
// whether it can be added, an accessible label and the toggle itself.
export function useCompareToggle(name, id) {
    const dispatch = useDispatch()
    const isSelected = useSelector((state) => selectCompare(state).some((item) => item.name === name))
    const isFull = useSelector(selectIsCompareFull)
    const displayName = formatName(name)

    const isDisabled = !isSelected && isFull
    const label = isSelected
        ? `Remove ${displayName} from compare`
        : isDisabled
          ? `Compare is full (${MAX_COMPARE} max)`
          : `Add ${displayName} to compare`

    const toggle = () => {
        dispatch(isSelected ? removeFromCompare(name) : addToCompare({ name, id: Number(id) }))
    }

    return { isSelected, isDisabled, label, toggle }
}
