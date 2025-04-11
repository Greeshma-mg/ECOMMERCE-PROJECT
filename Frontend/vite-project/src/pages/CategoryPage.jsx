import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../components/products';
import '../assets/CategoryPage.css';

function CategoryPage() {
  const { name } = useParams(); 
  const category = name; 
  const navigate = useNavigate();

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
    navigate('/cart');
  };

  return (
    <div className="category-page">
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="product-grid">
        {categoryProducts.map((product, index) => (
          <div key={`${product.name}-${index}`} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
