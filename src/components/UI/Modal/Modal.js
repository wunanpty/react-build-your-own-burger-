import React from 'react';
import classes from './Modal.css';

// to show order summary
const modal = (props) => (
    <div className={classes.Modal}>
        {props.children}
    </div>
);
export default modal;
   
