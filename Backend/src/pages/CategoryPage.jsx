import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../components/products';
import '../assets/CategoryPage.css';

function CategoryPage() {
  const { name } = useParams(); 
  const category = name; 

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="category-page">
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="product-grid">
        {categoryProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
