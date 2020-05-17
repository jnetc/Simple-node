document.querySelectorAll('.price').forEach(price => {
  price.textContent = new Intl.NumberFormat('fi-FI', {
    currency: 'EUR',
    style: 'currency',
  }).format(price.textContent);
});
