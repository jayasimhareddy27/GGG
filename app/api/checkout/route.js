import { FIRM_DETAILS } from '@/public/constants/firmdetails';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items, userEmail, userId } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // 1. Enforce user authentication
    if (!userId || userId.trim() === '') {
      return NextResponse.json(
        { error: 'You must be logged in to complete checkout.' },
        { status: 401 }
      );
    }

    // 1. Line items with tax code for automatic tax calculations
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name || item.productId,
          tax_code: 'txcd_99999999', // General Tangible Goods
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.quantity || 1,
    }));

    // 2. Shipping calculation
    const subtotal = items.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    const { standardCost, freeShippingThreshold, allowedCountries } = FIRM_DETAILS.commerce.shipping;
    const isFreeShipping = subtotal > freeShippingThreshold || subtotal === 0;

    // 3. Create Session with Native Shipping Options & Automatic Tax
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: userEmail || undefined,
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: allowedCountries,
      },
      // Native Stripe Shipping Rates
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: isFreeShipping ? 0 : Math.round(standardCost * 100),
              currency: 'usd',
            },
            display_name: isFreeShipping ? 'Free Shipping' : 'Standard Shipping',
          },
        },
      ],
      automatic_tax: { enabled: true },
      metadata: {
        userId: userId || '',
        items: JSON.stringify(
          items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          }))
        ),
      },
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}