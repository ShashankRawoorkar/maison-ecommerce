import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../services/api.js';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import ShopToolbar from './components/ShopToolbar/ShopToolbar.jsx';
import ProductCard from '../../components/ui/ProductCard/ProductCard.jsx';
import styles from './Shop.module.css';

const DEFAULT_FILTERS = {
  categories: [],
  brands: [],
  maxPrice: 2000,
  ratings: [],
};

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(() => {
    const initialFilters = { ...DEFAULT_FILTERS };
    const cat = searchParams.get('category');
    if (cat) initialFilters.categories = [cat];
    return initialFilters;
  });
  const [sort, setSort] = useState('featured');
  const [gridCols, setGridCols] = useState(4);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.categories.length === 1) params.category = filters.categories[0];
      if (filters.maxPrice < 2000) params.maxPrice = filters.maxPrice;
      if (sort !== 'featured') params.sort = sort;

      const filterParam = searchParams.get('filter');
      if (filterParam === 'sale') params.badge = 'Sale';
      if (filterParam === 'new') params.badge = 'New';

      const searchQuery = searchParams.get('search');
      if (searchQuery) params.search = searchQuery;

      let data = await getProducts(params);

      // Client-side filter for multiple categories
      if (filters.categories.length > 1) {
        data = data.filter((p) => filters.categories.includes(p.category));
      }

      // Client-side filter for brands
      if (filters.brands.length > 0) {
        data = data.filter((p) => filters.brands.includes(p.brand));
      }

      // Client-side filter for ratings
      if (filters.ratings.length > 0) {
        const minRating = Math.min(...filters.ratings);
        data = data.filter((p) => p.rating >= minRating);
      }

      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, sort, searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Sync URL category param to filter state
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setFilters((prev) => ({ ...prev, categories: [cat] }));
    }
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filterTitle = searchParams.get('filter');
  const searchQuery = searchParams.get('search');

  let pageTitle = 'All Collections';
  if (filterTitle === 'sale') pageTitle = 'Sale';
  if (filterTitle === 'new') pageTitle = 'New Arrivals';
  if (searchQuery) pageTitle = `Search: "${searchQuery}"`;
  if (filters.categories.length === 1) pageTitle = filters.categories[0];

  return (
    <div className={styles.shopPage}>
      <div className={styles.shopHero}>
        <div>
          <p className={styles.breadcrumb}>
            Home / <span>Shop</span>
          </p>
          <h1 className={styles.shopTitle}>{pageTitle}</h1>
        </div>
        <div className={styles.shopHeroRight}>
          <p className={styles.productCount}>
            Showing <strong>{products.length}</strong> products
          </p>
        </div>
      </div>

      <div className={styles.shopLayout}>
        <Sidebar filters={filters} onFilterChange={handleFilterChange} />

        <div className={styles.shopMain}>
          <ShopToolbar
            count={products.length}
            sort={sort}
            onSortChange={setSort}
            gridCols={gridCols}
            onGridColsChange={setGridCols}
          />

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          ) : products.length === 0 ? (
            <div className={styles.empty}>
              <p>No products found matching your filters.</p>
            </div>
          ) : (
            <div
              className={`${styles.shopGrid} ${
                gridCols === 3 ? styles.grid3 : styles.grid4
              }`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
