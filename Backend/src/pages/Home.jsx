import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../assets/Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  const categorySections = [
    {
      title: "Skin Care",
      items: [
        { name: "Hydrating Face Cream", image: "/images/skin1.jpg", price: "499" },
        { name: "Brightening cream", image: "/images/skin2.jpg", price: "399" },
        { name: "Brightening cream", image: "/images/skin3.jpg", price: "299" },
        { name: "whitening serum", image: "/images/skin4.jpg", price: "199" }
      ]
    },
    {
      title: "Summer Essentials",
      items: [
        { name: "Aloe Vera Gel", image: "/images/aloevera.jpg", price: "299" },
        { name: "Sunscreen", image: "/images/sunscreen.jpg", price: "349" },
        { name: "Facewash", image: "/images/facewash.jpg", price: "249" },
        { name: "Bodylotion", image: "/images/bodylotion.jpg", price: "349" }
      ]
    },
    {
      title: "Best Sellers",
      items: [
        { name: "Shampoo", image: "/images/shampoo.jpg", price: "699" },
        { name: "FaceWash", image: "/images/facewash.jpg", price: "299" },
        { name: "Face Cream", image: "/images/skin3.jpg", price: "349" },
        { name: "Hair oil", image: "/images/hair.jpg", price: "249" }
      ]
    },
    {
      title: "Hair Care",
      items: [
        { name: "Shampoo", image: "/images/shampoo.jpg", price: "499" },
        { name: "Hair oil", image: "/images/hair.jpg", price: "199" },
        { name: "Hair serum", image: "/images/hair2.jpg", price: "299" },
        { name: "Hair Mask", image: "/images/hair3.jpg", price: "399" }
      ]
    },
    {
      title: "Baby Care",
      items: [
        { name: "Baby Lotion", image: "/images/bodylotion.jpg", price: "349" },
        { name: "Baby Wash", image: "/images/baby2.jpeg", price: "399" },
        { name: "Baby cream", image: "/images/baby3.jpg", price: "299" },
        { name: "Gentle Baby Wash", image: "/images/baby1.jpg", price: "199" }
      ]
    }
  ];

  return (
    <>
      {/* 🌟 Hero Carousel Section */}
      <section className="hero-carousel">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={4000}
          showStatus={false}
        >
          <div>
            <img src="/images/poster1.jpg" alt="Poster 1" />
          </div>
          <div>
            <img src="/images/poster2.jpg" alt="Poster 2" />
          </div>
          <div>
            <img src="/images/poster3.jpg" alt="Poster 3" />
          </div>
        </Carousel>
      </section>

      {/* 🌼 Main Content Wrapper */}
      <div className="home">

        {/* 🌸 Category Sections */}
        {categorySections.map((section, index) => (
          <section className="category-section" key={index}>
            <h2>{section.title}</h2>
            <div className="product-grid">
              {section.items.map((item, idx) => (
                <div className="product-card" key={idx}>
                  <img src={item.image} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* 📣 Promo */}
        <section className="promo-section">
          <h2>Get 10% Off Your First Order!</h2>
          <p>Subscribe to our newsletter & receive exclusive offers.</p>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </section>
      </div>
    </>
  );
}

export default Home;
