const randomProductsNames = [
    {
        name: "Молоко",
        id: 1
    },
    {
        name: "Cыр",
        id: 2
    },
    {
        name: "Колбаса",
        id: 3
    },
    {
        name: "Селедка",
        id: 4
    },
    {
        name: "Яйца",
        id: 5
    },
    {
        name: "Хлеб",
        id: 6
    },
    {
        name: "Чай",
        id: 7
    },
    {
        name: "Сметана",
        id: 8
    },
    {
        name: "Вареники",
        id: 9
    }
]

export function addRandomProduct(state) {
    const randomProduct = randomProductsNames[
        Math.floor(Math.random() * randomProductsNames.length)
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
