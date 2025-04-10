import React, { useState, useEffect } from 'react';
import '../assets/Payment.css';
import {
  CardElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RC1dgQprZeGiT0Yhxx04EVX0dZXxWEvDds9MOoyeFLuRDBbuoyg6vYLRDwsBjlG3osC7AmQdRGGnWlY05vFYtoI000pxT6CyJ');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    const total = storedCart.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total * 100); // in paise
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      alert('Please enter your delivery address.');
      return;
    }

    const orderDetails = {
      name: cartItems.map(item => item.name).join(', '),
      quantity: cartItems.length,
      price: totalPrice,
      paymentMethod,
      address
    };

    // Handle UPI or COD
    if (paymentMethod === 'upi' || paymentMethod === 'cod') {
      setOrderSummary(orderDetails);
      setOrderConfirmed(true);
      localStorage.removeItem('cart');
      return;
    }

    // Handle Card Payment
    if (paymentMethod === 'card') {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: orderDetails.price })
        });

        const { clientSecret } = await res.json();

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        });

        if (result.error) {
          alert(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
          setOrderSummary(orderDetails);
          setOrderConfirmed(true);
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error("Payment error:", error);
        alert("Something went wrong!");
      }
      setLoading(false);
    }
  };

  if (orderConfirmed && orderSummary) {
    return (
      <div className="payment-success">
        <h2>🎉 Payment Completed</h2>
        <p><strong>Product:</strong> {orderSummary.name}</p>
        <p><strong>Quantity:</strong> {orderSummary.quantity}</p>
        <p><strong>Total Paid:</strong> ₹{(orderSummary.price / 100).toFixed(2)}</p>
        <p><strong>Payment Method:</strong> {orderSummary.paymentMethod.toUpperCase()}</p>
        <p><strong>Delivery Address:</strong> {orderSummary.address}</p>
      </div>
    );
  }

  return (
    <div className="payment-page-wrapper">
      <div className="payment-container">
        <h2>Choose Payment Method</h2>
        <form className="payment-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              Pay with Card
            </label>
            <label>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              />
              Pay with UPI
            </label>
            <label>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              Cash on Delivery
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-input">
              <CardElement />
            </div>
          )}

          <button type="submit" disabled={loading || (paymentMethod === 'card' && !stripe)}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
