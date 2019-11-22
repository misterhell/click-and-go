export function sum(state) {
    const sum = state.items.reduce((acc, item) => acc + (+item.cost * item.count || 0), 0)
    return sum.toFixed(2)
}
