import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishedKey = 'pk_test_c3Kn4ShzCNXVmIPeFwJ6wyeJ00P6tr542w';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response => {
            alert('Payment Successful');
        }).catch(error => {
            console.log('Payment Error: ', JSON.parse(error));
            alert('There was an Issue with ur payment. Please sure u use the provided credit card');
        });
    };

    return(
        <StripeCheckout
            label="Pay Now"
            name="Clothing Test Shop"
            billingAddress
            shippingAdress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishedKey}
        />
    );
};

export default StripeCheckoutButton;