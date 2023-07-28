export const { format: formatPrice } = new Intl.NumberFormat("eu", {
  style: "currency",
  currency: "EUR",
});
