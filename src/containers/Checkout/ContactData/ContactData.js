import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fasttest', displayValue: 'Fasttest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // alert('You continue!');
        // send request to backend
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            //in real project, this would be calculated on the server (backend)
            price: this.props.price,
            
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false });
                console.log(response);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false });
            } );
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // First step: copy original orderForm
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        // Aslo copy the properties inside my selected orderForm deeply
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        // Safely update the value
        updatedFormElement.value = event.target.value;
        // Set the update order to the copied orderForm
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // Finally, call setState
        this.setState({orderForm: updatedOrderForm});
    }

    render () {
        // Dynamically Creat Inputs based on JS Config
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id} 
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value} 
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
export default ContactData;