export function addRandomProduct(state) {
    const randomProduct = state.availableProducts[
        Math.floor(Math.random() * state.availableProducts.length)
    ]

    if (state.items.find(item => item.id == randomProduct.id) != undefined) {
        state
            .items[state.items.findIndex(item => item.id == randomProduct.id)]
            .count++
    } else {
        state.items.push({
            ...randomProduct,
            cost: (Math.random() * 100).toFixed(2),
            count: 1
        })
    }


}

export function selectRandomProduct(state) {
    const randomProduct = state.availableProducts[
        Math.floor(Math.random() * state.availableProducts.length)
    ]

    state.selectedProduct = randomProduct
}

export function unselectProduct(state) {
    state.selectedProduct = null
}