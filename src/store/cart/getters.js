export function sum(state) {
    const sum = state.items.reduce((acc, item) => {
        return acc + (+item.cost * item.count || 0)
    }, 0)
    return sum.toFixed(2)
}

export function count(state) {
    return state.items.reduce((acc, item) => acc + item.count, 0)
}