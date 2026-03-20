export function formatPrice(n) {
  if (n === null || n === undefined) return '';
  return '$' + Number(n).toLocaleString('en-US');
}

export function renderStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}
