const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { basketItems, email } = req.body;

  const transformItems = basketItems.map(
    ({ name, quantity, price, image }) => ({
      quantity: quantity,
      price_data: {
        currency: "gbp",
        unit_amount: price * 100,
        product_data: {
          name: name,
          images: [image],
        },
      },
    })
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1IxgOfDo5Q8Idi9CIdq3cfat"],
    shipping_address_collection: {
      allowed_countries: [
        "GB",
        "BE",
        "DE",
        "DK",
        "IE",
        "ES",
        "FR",
        "IT",
        "AT",
        "NL",
        "PT",
        "FI",
        "SE",
        "NO",
        "CH",
      ],
    },
    line_items: transformItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
    },
  });

  res.status(200).json({ id: session.id });
};
