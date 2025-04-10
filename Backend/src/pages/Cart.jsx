import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    localStorage.setItem('selectedProduct', JSON.stringify(cartItems));
    navigate('/payment');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Price: ₹{item.price}</p>
                <button className="remove-button" onClick={() => handleRemove(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{getTotal()}</h3>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
