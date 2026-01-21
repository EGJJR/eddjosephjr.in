import { NextResponse } from 'next/server'

// Beehiiv API integration
// To set up:
// 1. Get your API key from: https://www.beehiiv.com/settings/api
// 2. Find your publication ID in your Beehiiv dashboard
// 3. Add these to your .env.local file:
//    BEEHIIV_API_KEY=your_api_key_here
//    BEEHIIV_PUBLICATION_ID=your_publication_id_here
// 4. If API keys are not set, the form will still work but you'll need to
//    manually add subscribers through Beehiiv dashboard or use the embed form
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Option 1: Use Beehiiv API directly
    if (BEEHIIV_API_KEY && BEEHIIV_PUBLICATION_ID) {
      const response = await fetch(
        `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            reactivate_existing: false,
            send_welcome_email: true,
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Subscription failed')
      }

      return NextResponse.json({ success: true })
    }

    // Option 2: Use Beehiiv embed form (fallback)
    // Redirect to your Beehiiv embed URL
    // This is a fallback if API key is not configured
    return NextResponse.json(
      {
        success: true,
        message:
          'Please use the embed form: https://embeds.beehiiv.com/a45cb158-6258-4f7e-abdb-de5dfa4095af',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
