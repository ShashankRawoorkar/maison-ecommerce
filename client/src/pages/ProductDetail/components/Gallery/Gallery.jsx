import React, { useState } from 'react';
import styles from './Gallery.module.css';

export default function Gallery({ product }) {
  const [activeImg, setActiveImg] = useState(product.imgs?.[0] || product.img);

  return (
    <div className={styles.pdGallery}>
      <img
        className={styles.pdMainImg}
        src={activeImg}
        alt={product.name}
      />
      <div className={styles.pdThumbs}>
        {product.imgs?.map((img, i) => (
          <img
            key={i}
            className={`${styles.pdThumb} ${activeImg === img ? styles.active : ''}`}
            src={img}
            alt={`${product.name} view ${i + 1}`}
            onClick={() => setActiveImg(img)}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
