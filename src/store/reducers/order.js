import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false //purchased changes as soon as we did successfully purchase
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BURGER_START: return updateObject(state, {loading: true });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            // in case of success: store this order in orders array; set loading to false
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder) //old orders concatenate a new item
            };
        case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {loading: false});
        case actionTypes.FETCH_ORDER_START: return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDER_SUCCESS: return updateObject(state, {orders: action.orders, loading: false});
        case actionTypes.FETCH_ORDER_FAIL: return updateObject(state, {loading: false});
        default: return state;
    }
};
export default reducer;