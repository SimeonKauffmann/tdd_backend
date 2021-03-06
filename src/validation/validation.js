function isValidProduct(product) {
  if (!product) {
    return false;
  } else if (typeof product.name !== 'string') {
    return false;
  } else if (typeof product.price !== 'number') {
    return false;
  } else if (typeof product.id !== 'string') {
    return false;
  } else if (product.price < 0) {
    return false;
  }
  return true;
}

module.exports = { isValidProduct };
