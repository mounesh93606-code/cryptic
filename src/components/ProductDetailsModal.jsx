import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ProductDetailsModal({ product, onClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Default');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    sound.playPop();
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="product-modal-brand">{product.brand}</span>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <div className="product-modal-body">
          {/* Large Product Image */}
          <div className="product-modal-image-box">
            <img
              src={product.image}
              alt={product.name}
              className="product-modal-img"
            />
          </div>

          {/* Details Column */}
          <div className="product-modal-info">
            <h3 className="product-info-title">{product.name}</h3>

            <div className="product-info-price-row">
              <span className="product-info-price">${product.price.toFixed(2)}</span>
              <div className="product-info-rating">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span className="rating-num">{product.rating}</span>
                <span className="reviews-num">({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="product-info-desc">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="product-option-section">
                <label className="option-label">Color: <strong>{selectedColor}</strong></label>
                <div className="options-pills">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`option-pill ${selectedColor === c ? 'active' : ''}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="product-option-section">
                <label className="option-label">Option / Size: <strong>{selectedSize}</strong></label>
                <div className="options-pills">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`option-pill ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantees */}
            <div className="product-perks">
              <div className="perk-item">
                <Truck size={16} />
                <span>Free shipping & easy 30-day returns</span>
              </div>
              <div className="perk-item">
                <ShieldCheck size={16} />
                <span>Authentic product guaranteed</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className={`product-add-cart-btn ${added ? 'added' : ''}`}
              onClick={handleAdd}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add to Cart • ${product.price.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
