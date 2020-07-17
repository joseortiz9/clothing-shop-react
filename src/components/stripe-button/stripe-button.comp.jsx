import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishedKey = 'pk_test_c3Kn4ShzCNXVmIPeFwJ6wyeJ00P6tr542w';

    const onToken = token => {
        console.log(token);
        alert("Pay Successfully made!");
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