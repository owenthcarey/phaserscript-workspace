const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

export async function POST(request: Request) {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-04-10'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const responseData = {
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
  };

  // Create a JSON response with headers
  const headers = new Headers({ 'Content-Type': 'application/json' });
  // return res.status(200).json(responseData, { headers });
  return new Response(JSON.stringify(responseData), { headers });
}
