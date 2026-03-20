import React from 'react';
import { useCart } from '../../hooks/useCart.js';
import { formatPrice } from '../../utils/formatters.js';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <div
        className={`${styles.cartOverlay} ${isOpen ? styles.open : ''}`}
        onClick={closeCart}
      />
      <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.cartHeader}>
          <div>
            <div className={styles.cartTitle}>Your Cart</div>
            <div className={styles.cartCountText}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </div>
          </div>
          <button className={styles.cartClose} onClick={closeCart} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.cartItems}>
          {items.length === 0 ? (
            <div className={styles.cartEmpty}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <h3>Your cart is empty</h3>
              <p>Add some pieces to get started</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <img
                  className={styles.cartItemImg}
                  src={item.img}
                  alt={item.name}
                />
                <div className={styles.cartItemDetails}>
                  <div className={styles.cartItemBrand}>{item.brand}</div>
                  <div className={styles.cartItemName}>{item.name}</div>
                  {(item.selectedSize || item.selectedColor) && (
                    <div className={styles.cartItemVariant}>
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' · '}
                      {item.selectedColor && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: item.selectedColor,
                            border: '1px solid rgba(255,255,255,0.2)',
                            verticalAlign: 'middle',
                            marginLeft: '4px',
                          }}
                        />
                      )}
                    </div>
                  )}
                  <div className={styles.cartItemBottom}>
                    <div className={styles.cartItemQty}>
                      <button
                        className={styles.cartQtyBtn}
                        onClick={() => updateQty(index, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className={styles.cartQtyNum}>{item.qty}</span>
                      <button
                        className={styles.cartQtyBtn}
                        onClick={() => updateQty(index, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className={styles.cartItemPrice}>
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                  <button
                    className={styles.cartRemove}
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.cartSubtotal}>
              <span className={styles.cartSubtotalLabel}>Subtotal</span>
              <span className={styles.cartSubtotalAmount}>{formatPrice(totalPrice)}</span>
            </div>
            <p className={styles.cartShipping}>
              {totalPrice >= 150 ? 'Free shipping on this order' : `Add ${formatPrice(150 - totalPrice)} more for free shipping`}
            </p>
            <button className={styles.cartCheckout}>Proceed to Checkout</button>
            <button className={styles.cartContinue} onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
