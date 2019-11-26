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


export function addProductToCart(state, { count }) {
    const { id: prodId } = state.selectedProduct

    if (state.items.find(item => item.id == prodId) != undefined) {
        state
            .items[state.items.findIndex(item => item.id == prodId)]
            .count += count
    } else {
        state.items.push({
            ...state.selectedProduct,
            count: count
        })
    }
}


export function clearCart(state) {
    state.items = []
    state.selectedProduct = null
}

export function deleteById(state, id) {
    state.items = state.items.filter(item => item.id !== id)
}

export function addCountById(state, { id, count }) {
    const index = state.items.findIndex(item => item.id == id)
    state.items[index].count += count
}