export default function currencyFormat(props) {
  const price = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return price.format(props.value);
}
