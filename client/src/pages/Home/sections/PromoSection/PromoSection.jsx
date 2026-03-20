import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/ui/Button/Button.jsx';
import styles from './PromoSection.module.css';

export default function PromoSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.promoSection}>
      <div className={styles.promoGrid}>
        <div className={styles.promoCard} onClick={() => navigate('/shop?filter=sale')}>
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800&q=80"
            alt="Summer Sale"
          />
          <div className={styles.promoContent}>
            <div className={styles.promoTag}>Limited Time</div>
            <div className={styles.promoTitle}>
              Summer Sale<br />Up to 40% Off
            </div>
            <div className={styles.promoSub}>On selected premium items</div>
            <Button variant="primary" onClick={(e) => { e.stopPropagation(); navigate('/shop?filter=sale'); }}>
              Shop Sale
            </Button>
          </div>
        </div>

        <div className={styles.promoCard} onClick={() => navigate('/shop?filter=new')}>
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
            alt="New Arrivals"
          />
          <div className={styles.promoContent}>
            <div className={styles.promoTag}>Just Arrived</div>
            <div className={styles.promoTitle}>
              New Season<br />Essentials
            </div>
            <div className={styles.promoSub}>Refined pieces for the modern wardrobe</div>
            <Button variant="outline" onClick={(e) => { e.stopPropagation(); navigate('/shop?filter=new'); }}>
              Discover Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
