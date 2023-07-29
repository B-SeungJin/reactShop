import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: 'kim',
    reducers : {
        changeName(state){
            return 'john' + state
        }
    }
})
export let { changeName } = user.actions

let cart = createSlice({
    name: 'cart',
    initialState:    
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){
            state[action.payload].count++
        },
        addItem(state, action){
            state.push(action.payload)
            // addItem({id: 1, name: 'Red Kint', count: 1})
            // 명령시 삽입이 됌.
        }
    }
})
export let { addCount, addItem } = cart.actions


export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer
    }
    
})