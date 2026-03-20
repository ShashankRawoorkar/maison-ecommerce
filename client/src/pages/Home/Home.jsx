import React from 'react';
import HeroSection from './sections/HeroSection/HeroSection.jsx';
import CategoriesSection from './sections/CategoriesSection/CategoriesSection.jsx';
import FeaturedProducts from './sections/FeaturedProducts/FeaturedProducts.jsx';
import PromoSection from './sections/PromoSection/PromoSection.jsx';
import NewsletterSection from './sections/NewsletterSection/NewsletterSection.jsx';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <PromoSection />
      <NewsletterSection />
    </div>
  );
}
