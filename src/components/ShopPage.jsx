import React, { useState } from 'react';
import { Search, ShoppingBag, Star, Plus } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ShopPage({
  products,
  onSelectProduct,
  onAddToCart,
  cartCount,
  onOpenCart
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [shopSearch, setShopSearch] = useState('');

  const categories = ['All', 'Footwear', 'Tech', 'Apparel', 'Accessories', 'Lifestyle'];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(shopSearch.toLowerCase()) ||
                          prod.brand.toLowerCase().includes(shopSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-page-wrapper animate-fade">
      {/* Shop Header Bar */}
      <div className="shop-header-row">
        <div className="shop-title-box">
          <h2 className="section-title">Shop</h2>
          <span className="shop-subtitle">Curated drops & aesthetic goods</span>
        </div>

        {/* View Cart Button */}
        <button
          className="shop-cart-header-btn"
          onClick={() => {
            sound.playPop();
            onOpenCart();
          }}
        >
          <ShoppingBag size={18} />
          <span>Cart ({cartCount})</span>
        </button>
      </div>

      {/* Shop Search Bar */}
      <div className="shop-search-wrapper">
        <Search size={16} className="shop-search-icon" />
        <input
          type="text"
          className="shop-search-input"
          placeholder="Search items, brands, collections..."
          value={shopSearch}
          onChange={(e) => setShopSearch(e.target.value)}
        />
      </div>

      {/* Category Filter Pills */}
      <div className="shop-categories-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`shop-category-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => {
              sound.playPop();
              setSelectedCategory(cat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="shop-products-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => onSelectProduct(product)}
            role="button"
            tabIndex={0}
          >
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-card-img"
                loading="lazy"
              />
              <button
                className="product-quick-add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playPop();
                  onAddToCart(product);
                }}
                title="Quick Add to Cart"
                aria-label="Add to cart"
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className="product-card-details">
              <div className="product-brand-rating">
                <span className="product-brand-text">{product.brand}</span>
                <div className="product-stars">
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <h4 className="product-card-title">{product.name}</h4>
              <div className="product-card-price">${product.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
