import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import {connectToDB} from '@/lib/mongodb';
import Order from '@/models/orders';
import User from '@/models/login';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || 'Customer';
    const shippingDetails = session.shipping_details?.address || {};
    const address = `${shippingDetails.line1 || ''}, ${shippingDetails.city || ''}, ${shippingDetails.state || ''} ${shippingDetails.postal_code || ''}`;
    const totalAmount = (session.amount_total / 100).toFixed(2);

    try {
      await connectToDB();
      
      const items = session.metadata?.items ? JSON.parse(session.metadata.items) : [];
      const userId = session.metadata?.userId;

      // Extract accurate totals provided natively by Stripe Session
      const subtotal = session.amount_subtotal / 100;
      const shippingCost = (session.total_details?.amount_shipping || 0) / 100;
      const tax = (session.total_details?.amount_tax || 0) / 100;

      const newOrder = await Order.create({
        user: userId && userId.trim() !== '' ? userId : null,
        items,
        shippingAddress: {
          fullName: customerName,
          street: shippingDetails.line1,
          city: shippingDetails.city,
          state: shippingDetails.state,
          zipCode: shippingDetails.postal_code,
          phone: session.customer_details?.phone || '',
        },
        paymentMethod: 'Stripe',
        subtotal,
        shippingCost,
        tax,
        totalAmount: session.amount_total / 100,
        paymentStatus: 'Paid',
        stripeSessionId: session.id,
      });

      if (userId && userId.trim() !== '') {
        await User.findByIdAndUpdate(userId, {
          $push: { orders: newOrder._id },
        });
      }
    } catch (dbErr) {
      console.error('Failed to save order in webhook:', dbErr);
    }

    // Send Confirmation Email
    try {
      await resend.emails.send({
        from: 'Orders <orders@yourdomain.com>',
        to: customerEmail,
        subject: 'Order Confirmation - Thank you for your purchase!',
        html: `
          <h2>Thank you for your business, ${customerName}!</h2>
          <p>We have successfully received your payment of <strong>$${totalAmount}</strong>.</p>
          <p><strong>Shipping Address:</strong> ${address}</p>
        `,
      });
    } catch (emailErr) {
      console.error('Failed to send email:', emailErr);
    }
  }

  return NextResponse.json({ received: true });
}