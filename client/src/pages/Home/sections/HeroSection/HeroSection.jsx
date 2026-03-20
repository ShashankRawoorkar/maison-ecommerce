import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/ui/Button/Button.jsx';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />
      <img
        className={styles.heroImg}
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
        alt="Hero"
      />
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <div className={styles.heroEyebrow}>Spring / Summer 2026</div>
        <h1 className={styles.heroTitle}>
          Dress With<br />
          <em>Intention.</em>
        </h1>
        <p className={styles.heroSub}>
          Curated luxury for the discerning individual. Every piece tells a story, every collection a chapter.
        </p>
        <div className={styles.heroActions}>
          <Button variant="primary" onClick={() => navigate('/shop')}>
            Shop the Collection
          </Button>
          <Button variant="outline" onClick={() => navigate('/shop')}>
            Explore Lookbook
          </Button>
        </div>
      </div>

      <div className={styles.heroStats}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>12K+</span>
          <span className={styles.statLabel}>Happy Clients</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>500+</span>
          <span className={styles.statLabel}>Curated Pieces</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>48</span>
          <span className={styles.statLabel}>Luxury Brands</span>
        </div>
      </div>
    </section>
  );
}
