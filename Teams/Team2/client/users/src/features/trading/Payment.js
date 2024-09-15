import React, { useCallback, useState } from 'react';
import { buyStockViaBankTransfer,buyStockViaCreditCard } from './tradingApi';
import { useForm } from 'react-hook-form';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './payment.css';
import { useDispatch,useSelector } from 'react-redux';


const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = () => {
  const currentTransactionDetails=useSelector(st=>st.trading.currentTransactionDetails)
  const stripe = useStripe();
  const elements = useElements();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const selectedPaymentMethod = watch('paymentMethod');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      if (data.paymentMethod === 'creditCard') {
        if (!stripe || !elements) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });

        if (error) {
          throw new Error(error.message);
        } else {
          // Send paymentMethod.id to your server to process the payment
          console.log('Payment Method:', paymentMethod);
          // Call your backend API to handle the payment
          const res=await buyStockViaCreditCard(currentTransactionDetails.userMail,currentTransactionDetails.symbol,currentTransactionDetails.quantity,paymentMethod.id);
        }
      }
       else if (data.paymentMethod === 'bankTransfer') {
        // Handle bank transfer information
        console.log('Bank Transfer Data:', data);
        // Send bank transfer data to your server
       const res=await buyStockViaBankTransfer(currentTransactionDetails.userMail,currentTransactionDetails.symbol,currentTransactionDetails.quantity,data) 
      }
      }
    
      //alert('Payment processed successfully!');
    
    catch (err) {
      setError(err.message || 'An error occurred during payment processing.');
    } finally {
      setIsLoading(false);
    }
  }, [stripe, elements]);

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
        <div className="form-group">
          <label>
            <input
              type="radio"
              value="creditCard"
              {...register('paymentMethod', { required: true })}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              value="bankTransfer"
              {...register('paymentMethod', { required: true })}
            />
            Bank Transfer
          </label>
          {errors.paymentMethod && <p className="error">Payment method is required</p>}
        </div>

        {selectedPaymentMethod === 'creditCard' && (
          <div className="credit-card-info">
        
            <div className="form-group">
              <label htmlFor="creditCardNumber">Credit Card Details:</label>
              <CardElement id="creditCardNumber" />
            </div>
          </div>
        )}

        {selectedPaymentMethod === 'bankTransfer' && (

          <div className="bank-transfer-info">
                <div className="form-group">
              <label htmlFor="name">Cardholder Name:</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: true })}
                placeholder="Enter  name"
              />
              {errors.cardholderName && <p className="error">Cardholder name is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Bank Account Number:</label>
              <input
                type="text"
                id="accountNumber"
                {...register('accountNumber', { required: true })}
                placeholder="Enter your bank account number"
              />
              {errors.accountNumber && <p className="error">Bank account number is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="routingNumber">Bank Routing Number:</label>
              <input
                type="text"
                id="routingNumber"
                {...register('routingNumber', { required: true })}
                placeholder="Enter your bank routing number"
              />
              {errors.routingNumber && <p className="error">Routing number is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="bankName">Bank Name:</label>
              <input
                type="text"
                id="bankName"
                {...register('bankName', { required: true })}
                placeholder="Enter your bank name"
              />
              {errors.bankName && <p className="error">Bank name is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="iban">IBAN (if applicable):</label>
              <input
                type="text"
                id="iban"
                {...register('iban')}
                placeholder="Enter your IBAN"
              />
            </div>
            <div className="form-group">
              <label htmlFor="swift">SWIFT/BIC Code (if applicable):</label>
              <input
                type="text"
                id="swift"
                {...register('swift')}
                placeholder="Enter your SWIFT/BIC code"
              />
            </div>
          </div>
        )}

        {error && <p className="error">{error}</p>}
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;