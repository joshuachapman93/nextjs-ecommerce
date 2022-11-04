export const initialState = {
    prices: [],
    products: {} //[{id: {[size]: quantity}}]
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case "add_product": { //receives [[id], [size]]
            return {
                ...state,
                products: {
                    ...state.products,
                    ...(!(action.value[0] in state.products) ? {
                        [action.value[0]]: {
                            [action.value[1]]: 1
                        }
                    } : !(action.value[1] in state.products[action.value[0]]) ? {
                        [action.value[0]]: {
                            ...state.products[action.value[0]],
                            [action.value[1]]: 1
                        }
                    } : {
                        [action.value[0]]: {
                            ...state.products[action.value[0]],
                            [action.value[1]]: 1 + state.products[action.value[0]][action.value[1]]
                        }
                    })
                }
            }
        }
        case "vary_count": { //receives [[id], [size], [new count]]
            return {
                ...state,
                products: {
                    ...state.products,
                    ...{
                        [action.value[0]]: {
                            ...state.products[action.value[0]],
                            [action.value[1]]: action.value[2]
                        }
                    }
                }

            }
        }
        case "remove_product": { //receives [[id], [size]]
            return {
                ...state,
                products: Object.keys(state.products).reduce((acc, curr) => {
                    const prod = state.products[curr]
                    const sizes = Object.keys(prod)
                    console.log(sizes.length - 1)
                    if (curr !== action.value[0]) { return { ...acc, [curr]: prod } }
                    if (sizes.length - 1 < 1) { return acc }
                    return {
                        [curr]: sizes.reduce((acc2, curr2) => {
                            if (curr2 !== action.value[1]) { return { ...acc2, [curr2]: prod[curr2] } }
                            return acc2
                        }, {})
                    }
                }, {})
            }
        }
        case "load_items": {
            return {
                ...state,
                prices: action.value.prices,
                products: action.value.products
            }
        }
        case "set_prices": {
            return {
                ...state,
                prices: action.value
            }
        }
        default:
            return state
    }
}