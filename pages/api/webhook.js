// stripe webhook to listen to transaction events, and send order details to firestore database upon verified payment

import { buffer } from "micro";
import * as admin from "firebase-admin";

// Firebase
const serviceAccount = require("../../permissions.json");
// Merge permissions with env secret keys
serviceAccount.client_id = process.env.FIREBASE_ADMIN_CLIENT_ID;
serviceAccount.private_key_id = process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID;
serviceAccount.private_key = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Stripe

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

const fullfillOrder = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to DB!`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // Verify (came from stripe)
    try {
      event = await stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.log("ERROR", e.message);
      return res.status(400).send({ message: `Webhook error: ${err.message}` });
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fullfill the order
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) =>
          res.status(400).send({ message: `Webhook error: ${err.message}` })
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
