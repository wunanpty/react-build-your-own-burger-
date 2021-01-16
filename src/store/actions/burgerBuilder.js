import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGRENDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGRENDIENT,
        ingredientName: name
    }
}

// the synchronous action creator
// this will be used in the below initIngredients which is a async
export const setIngreients = (ingredients) => {
    return {
        type: actionTypes.SET_INGRENDIENT,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-43ca6-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngreients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            } );
    };
};

