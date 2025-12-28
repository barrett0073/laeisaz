import { NextResponse } from 'next/server'
import { db } from '../../../lib/database'
import { IEvent, eventFromDb } from '../../../lib/types'

// GET a single event
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM events WHERE id = ?',
      [params.id]
    );
    
    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    const event = eventFromDb((rows as any[])[0]);
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT (update) an event
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate required fields if provided
    if (body.title && (!body.title.en || !body.title.fa)) {
      return NextResponse.json(
        { error: 'Missing language translations for title' },
        { status: 400 }
      )
    }
    
    if (body.message && (!body.message.en || !body.message.fa)) {
      return NextResponse.json(
        { error: 'Missing language translations for message' },
        { status: 400 }
      )
    }

    // Check if event exists
    const [existingRows] = await db.execute(
      'SELECT * FROM events WHERE id = ?',
      [params.id]
    );
    
    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];
    
    if (body.title) {
      updateFields.push('title_en = ?', 'title_fa = ?');
      updateValues.push(body.title.en, body.title.fa);
    }
    if (body.message) {
      updateFields.push('message_en = ?', 'message_fa = ?');
      updateValues.push(body.message.en, body.message.fa);
    }
    if (body.type) {
      updateFields.push('type = ?');
      updateValues.push(body.type);
    }
    if (body.startDate) {
      updateFields.push('start_date = ?');
      updateValues.push(new Date(body.startDate));
    }
    if (body.endDate) {
      updateFields.push('end_date = ?');
      updateValues.push(new Date(body.endDate));
    }
    if (body.isActive !== undefined) {
      updateFields.push('is_active = ?');
      updateValues.push(body.isActive);
    }
    if (body.link !== undefined) {
      updateFields.push('link = ?');
      updateValues.push(body.link);
    }
    if (body.icon !== undefined) {
      updateFields.push('icon = ?');
      updateValues.push(body.icon);
    }
    if (body.priority !== undefined) {
      updateFields.push('priority = ?');
      updateValues.push(body.priority);
    }
    if (body.image !== undefined) {
      updateFields.push('image = ?');
      updateValues.push(body.image);
    }
    
    updateFields.push('updated_at = NOW()');
    updateValues.push(params.id);

    await db.execute(
      `UPDATE events SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    // Fetch and return the updated event
    const [updatedRows] = await db.execute(
      'SELECT * FROM events WHERE id = ?',
      [params.id]
    );
    
    const updatedEvent = eventFromDb((updatedRows as any[])[0]);
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: `Failed to update event: ${error.message}` },
      { status: 500 }
    );
  }
}

// DELETE an event
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if event exists
    const [rows] = await db.execute(
      'SELECT * FROM events WHERE id = ?',
      [params.id]
    );
    
    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Delete the event
    await db.execute(
      'DELETE FROM events WHERE id = ?',
      [params.id]
    );
    
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
} 