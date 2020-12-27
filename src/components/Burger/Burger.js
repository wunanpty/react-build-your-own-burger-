import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //because, from parent component (burgerBuilder), the ingredients is an object
    //transform object into array, use Object.keys to get an array of keys of the object
    //in map() transform this string value into an array with as many elements as we have 
    //ingredients for a given ingredient.
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

   // console.log(transformedIngredients);
   if (transformedIngredients.length === 0) {
       transformedIngredients = <p>Please start adding ingredients!</p>;
   }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;