export function someAction(/* context */) {



}


export function addToCart({ commit }, { count }) {
    commit('addProductToCart', { count })
    commit('unselectProduct')
}
