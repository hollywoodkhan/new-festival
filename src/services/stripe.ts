export async function createCheckoutSession(items: any[]) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        successUrl: `${window.location.origin}/tickets?success=true`,
        cancelUrl: `${window.location.origin}/?cancelled=true`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Stripe error:', error);
    throw error;
  }
}
