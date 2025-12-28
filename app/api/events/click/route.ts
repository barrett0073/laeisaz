import { NextResponse } from 'next/server'
import { db } from '../../../lib/database'

// POST to increment click count for an event
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate event ID
    if (!body.eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      )
    }

    // Find event and increment click count
    const [result] = await db.execute(
      'UPDATE events SET click_count = click_count + 1 WHERE id = ?',
      [body.eventId]
    );
    
    // Check if event was found and updated
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    
    // Get updated click count
    const [rows] = await db.execute(
      'SELECT click_count FROM events WHERE id = ?',
      [body.eventId]
    );
    
    const clickCount = (rows as any[])[0]?.click_count || 0;
    
    return NextResponse.json({ success: true, clickCount })
  } catch (error) {
    console.error('Error tracking event click:', error)
    return NextResponse.json(
      { error: 'Failed to track event click' },
      { status: 500 }
    )
  }
} 