import React, { useState, useEffect, useRef } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { addItem } from "./CartSlice";
import { useSelector, useDispatch } from "react-redux";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const productsRef = useRef(null);

  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15", sale: true },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3", description: "Calming scent, used in aromatherapy.", cost: "$20", sale: true },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: "$12" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress and promotes sleep.", cost: "$14" },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Beautiful flowering plant known for its fragrance.", cost: "$22" }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        { name: "Oregano", image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg", description: "Contains compounds that deter insects.", cost: "$10" },
        { name: "Marigold", image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg", description: "Natural insect repellent, adds color to garden.", cost: "$8", sale: true },
        { name: "Geraniums", image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg", description: "Repels insects and adds scent.", cost: "$20" },
        { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg", description: "Repels flies and mosquitoes.", cost: "$9" },
        { name: "Catnip", image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg", description: "Repels mosquitoes and attracts cats.", cost: "$13" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Soothing gel for skin ailments.", cost: "$14" },
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", description: "Boosts immune system.", cost: "$16" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", description: "Relieves digestive issues.", cost: "$13" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Calms nerves and promotes relaxation.", cost: "$14" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", description: "Soothes anxiety and promotes sleep.", cost: "$15" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg", description: "Heals wounds and soothes skin.", cost: "$12" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop", description: "Thrives in low light.", cost: "$25", sale: true },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg", description: "Tolerates neglect.", cost: "$10" },
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Needs infrequent watering.", cost: "$15" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg", description: "Hardy plant.", cost: "$20" },
        { name: "Succulents", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Drought-tolerant.", cost: "$18" },
        { name: "Aglaonema", image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg", description: "Minimal care, adds color.", cost: "$22" }
      ]
    }
  ];

  // Sync local addedToCart με redux store
  useEffect(() => {
    const map = {};
    cartItems.forEach((it) => {
      if (it && it.name) map[it.name] = true;
    });
    setAddedToCart((prev) => ({ ...prev, ...map }));
  }, [cartItems]);

  const calculateTotalQuantity = () =>
    cartItems.length ? cartItems.reduce((t, it) => t + (it.quantity || 0), 0) : 0;

  const handleHomeClick = (e) => {
    e?.preventDefault();
    onHomeClick && onHomeClick();
  };

  const handleCartClick = (e) => {
    e?.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e?.preventDefault();
    if (productsRef.current) productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e?.preventDefault();
    setShowCart(false);
    if (productsRef.current) productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prev) => ({ ...prev, [product.name]: true }));
  };

  return (
    <div>
      <div className="navbar">
        <div className="luxury" onClick={handleHomeClick} style={{ cursor: "pointer" }}>
          <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" />
          <div className="brand-text">
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </div>
        </div>

        <div className="nav-links">

          <a href="#about-us" onClick={(e) => { e.preventDefault(); onAboutClick(); }} className="no-underline">
          About Us
          </a>
          <a href="#plants" onClick={handlePlantsClick} className="no-underline">Plants</a>
          <a href="#cart" onClick={handleCartClick} className="no-underline">
            <div className="cart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="40" width="40" aria-hidden>
                <rect width="156" height="156" fill="none"></rect>
                <circle cx="80" cy="216" r="12"></circle>
                <circle cx="184" cy="216" r="12"></circle>
                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              {calculateTotalQuantity() > 0 && <span className="cart-badge">{calculateTotalQuantity()}</span>}
            </div>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid" ref={productsRef} id="plants">
          {plantsArray.map((category, cIdx) => (
            <section key={cIdx} className="category-section">
              <h2 className="category-name">{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant, pIdx) => (
                  <div className="plants-card" key={`${cIdx}-${pIdx}`}>
                    {plant.sale && <div className="sale-badge">SALE</div>}
                    <img className="plants-image" src={plant.image} alt={plant.name} />
                    <div className="plants-title"><h3>{plant.name}</h3></div>
                    <div className="plants-description">{plant.description}</div>
                    <div className="plants-cost">{plant.cost}</div>
                    <button
                      className={`plants-button ${addedToCart[plant.name] ? "added-to-cart" : ""}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={!!addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
