import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CartDrawer({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onClose
}) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    sound.playLike();
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} />
            <h3>Your Cart</h3>
            <span className="cart-items-badge">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        {checkoutSuccess ? (
          <div className="cart-success-view animate-fade">
            <div className="success-icon-bounce">
              <CheckCircle2 size={64} color="#10b981" />
            </div>
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for shopping on Instagram Store. A confirmation receipt has been sent to your email.</p>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="cart-items-scroll">
              {cartItems.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="empty-cart-icon">
                    <ShoppingBag size={48} color="#b0b3b8" />
                  </div>
                  <h4>Your cart is empty</h4>
                  <p>Discover trendsetting fashion, creator drops, and gadgets in the Shop.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="cart-item-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-thumb"
                    />

                    <div className="cart-item-info">
                      <span className="cart-item-brand">{item.brand}</span>
                      <h4 className="cart-item-name">{item.name}</h4>
                      {(item.selectedColor || item.selectedSize) && (
                        <span className="cart-item-options">
                          {item.selectedColor} • {item.selectedSize}
                        </span>
                      )}
                      <span className="cart-item-unit-price">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="cart-item-controls">
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        className="cart-item-delete-btn"
                        onClick={() => {
                          sound.playPop();
                          onRemoveItem(item.id);
                        }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer Calculation */}
            {cartItems.length > 0 && (
              <div className="cart-footer-box">
                <div className="cart-calc-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-calc-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="cart-total-row">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="cart-checkout-btn" onClick={handleCheckout}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
