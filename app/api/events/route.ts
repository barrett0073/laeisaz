import { NextResponse } from 'next/server'
import { db, executeQuery } from '../../lib/database'
import { IEvent, eventFromDb } from '../../lib/types'

// GET all events
export async function GET() {
  try {
    // Test database connection first
    try {
      await db.execute('SELECT 1');
    } catch (connectionError) {
      console.error('Database connection failed:', connectionError);
      return NextResponse.json(
        { error: 'Database connection failed', details: connectionError.message },
        { status: 503 }
      );
    }

    const rows = await executeQuery(
      'SELECT * FROM events ORDER BY priority DESC, start_date DESC'
    );
    
    // Convert to interface format
    const convertedEvents = (rows as any[]).map(eventFromDb);
    return NextResponse.json(convertedEvents)
  } catch (error: any) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch events',
        details: error.message,
        code: error.code 
      }, 
      { status: 500 }
    )
  }
}

// POST (create) a new event
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Received event data:', JSON.stringify(body, null, 2))
    
    // Validate required fields
    if (!body.title || !body.message || !body.type || !body.startDate || !body.endDate) {
      console.log('Missing required fields:', {
        hasTitle: !!body.title,
        hasMessage: !!body.message,
        hasType: !!body.type,
        hasStartDate: !!body.startDate,
        hasEndDate: !!body.endDate
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate language translations
    if (!body.title.en || !body.title.fa || 
        !body.message.en || !body.message.fa) {
      console.log('Missing language translations:', {
        hasTitleEn: !!body.title.en,
        hasTitleFa: !!body.title.fa,
        hasMessageEn: !!body.message.en,
        hasMessageFa: !!body.message.fa
      })
      return NextResponse.json(
        { error: 'Missing language translations' },
        { status: 400 }
      )
    }

    // Connection is handled by the pool

    try {
      const eventId = `ev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date();
      const startDate = new Date(body.startDate);
      const endDate = new Date(body.endDate);
      
      await db.execute(
        `INSERT INTO events (
          id, title_en, title_fa, message_en, message_fa, 
          type, start_date, end_date, is_active, link, icon,
          priority, image, click_count, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          eventId,
          body.title.en,
          body.title.fa,
          body.message.en,
          body.message.fa,
          body.type,
          startDate,
          endDate,
          body.isActive !== undefined ? body.isActive : true,
          body.link || '',
          body.icon || '',
          body.priority || 1,
          body.image || '',
          0, // initial click count
          now,
          now
        ]
      );

      // Fetch the created event
      const [rows] = await db.execute(
        'SELECT * FROM events WHERE id = ?',
        [eventId]
      );
      
      const createdEvent = eventFromDb((rows as any[])[0]);
      
      console.log('Event created successfully:', eventId);
      return NextResponse.json(createdEvent);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: `Database error: ${dbError.message}` }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: `Failed to create event: ${error.message}` }, { status: 500 });
  }
} 