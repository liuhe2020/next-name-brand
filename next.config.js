module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
