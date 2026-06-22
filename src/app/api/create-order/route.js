import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST() {
  try {
    const options = {
      amount: 1000,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return Response.json(order);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}