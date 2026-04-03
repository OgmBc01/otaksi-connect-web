import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, service, message, location } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }


    const supabase = await createClient();

    // Insert the contact submission
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company?.trim() || null,
          phone: phone?.trim() || null,
          service: service || null,
          message: message.trim(),
          location: location || 'dubai',
          status: 'new',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      // Log the attempted insert data for debugging
      console.error('Attempted insert data:', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        phone: phone?.trim() || null,
        service: service || null,
        message: message.trim(),
        location: location || 'dubai',
        status: 'new',
      });
      return NextResponse.json(
        { error: 'Failed to submit contact form. Please try again.', details: error.message, insertData: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company?.trim() || null,
          phone: phone?.trim() || null,
          service: service || null,
          message: message.trim(),
          location: location || 'dubai',
          status: 'new',
        } },
        { status: 500 }
      );
    }

    // Optional: Send email notification (implement later)
    // await sendEmailNotification(data);

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}