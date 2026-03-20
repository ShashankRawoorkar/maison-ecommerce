const products = require('../data/products');

const getAllProducts = (req, res, next) => {
  try {
    let result = [...products];
    const { category, maxPrice, sort, badge, search } = req.query;

    if (category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (badge) {
      result = result.filter(
        (p) => p.badge && p.badge.toLowerCase() === badge.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        result = result.filter((p) => p.price <= max);
      }
    }

    if (sort) {
      switch (sort) {
        case 'price_asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
          break;
        default:
          break;
      }
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getProductById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      return next(err);
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const getFeaturedProducts = (req, res, next) => {
  try {
    res.json(products.slice(0, 4));
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts, getProductById, getFeaturedProducts };
