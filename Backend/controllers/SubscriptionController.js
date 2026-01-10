import { prisma } from "../config/db.config.js";
import stripe from "../config/stripe.js";

//For creating plus member session--------
export const plusMemberSession = async (req, res) => {
  const { userId, email, billedAnnually } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"], // card payment
      line_items: [
        billedAnnually
          ? {
              price: "price_1Snx4kAjVvX0Obs1seNsvee5",
              quantity: 1,
            }
          : {
              price: "price_1Snx41AjVvX0Obs1OOSqo3Tn",
              quantity: 1,
            },
      ],
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          userId,
        },
      },
      customer_email: email,
      success_url:
        process.env.CLIENT_URL +
        "/success?session_id={CHECKOUT_SESSION_ID}&type=subscription",
      cancel_url: process.env.CLIENT_URL + "/cancel",
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
//Controller to verify session from the stripe....---------
export const verifySubscriptionSession = async (req, res) => {
  const { sessionId } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "customer"],
    });
    const subscription = session.subscription;
    const customer = session.customer;
    if (!customer) {
      return res
        .status(400)
        .json({ message: "No subscription found", success: false });
    }
    //If the user has taken the subscription save into the DB and make him plus member
    const subscriptionDetail = await prisma.subscriptionDetail.create({
      data: {
        userId: Number(subscription.metadata.userId) || req.user.id,
        subscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        planId: subscription.items.data[0].price.id,
        trialStart: new Date(subscription.trial_start * 1000),
        trialEnd: new Date(subscription.trial_end * 1000),
        status: subscription.status,
      },
    });

    if (!subscriptionDetail)
      return res.status(400).json({
        message: "Subscription can't be created or it may already existed",
        success: false,
      });
    //Make the user plus and return into the frontend-------
    await prisma.user.update({
      where: {
        id: Number(subscription.metadata.userId),
      },
      data: {
        plusMember: true,
      },
    });
    return res
      .status(200)
      .json({ message: "Your free trial is activated🎉🎉", success: true });
  } catch (error) {
    console.log(error);
  }
};
