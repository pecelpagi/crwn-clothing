import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KFzhkJDk2j4jQilGkSJweBQfo65CzZ1ukLbjaKTRdzXBUTLwmgKgT8bKBcLpViOs0ctMt9L3ScIgjmgIK1nuqTG00EIMXEvWy';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token,
            }
        }).then((response) => {
            alert('Payment successfuly');
            window.location.href = "/";
        }).catch((error) => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment. Please sure you use the provided credit card.');
        });
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;