import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    // Gebruik anon key voor client-side operaties
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Environment variables check:', {
      supabaseUrl: supabaseUrl ? 'Set' : 'Missing',
      supabaseAnonKey: supabaseAnonKey ? 'Set' : 'Missing',
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseAnonKey?.length || 0
    });
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables');
      console.error('Supabase URL:', supabaseUrl);
      console.error('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');
      return NextResponse.json(
        { error: 'Server configuratie fout - environment variables ontbreken' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const body = await request.json();
    
    console.log('Request body received:', {
      interesse: body.interesse,
      bestellingen: body.bestellingen ? 'Present' : 'Missing',
      frequentie: body.frequentie,
      tijd: body.tijd,
      straat: body.straat,
      huisnummer: body.huisnummer,
      voornaam: body.voornaam,
      achternaam: body.achternaam,
      email: body.email
    });
    
    // Valideer verplichte velden
    if (!body.voornaam || !body.achternaam || !body.email) {
      return NextResponse.json(
        { error: 'Voornaam, achternaam en email zijn verplicht' },
        { status: 400 }
      );
    }

    // Valideer email formaat
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Ongeldig emailadres' },
        { status: 400 }
      );
    }

    // Controleer of email al bestaat
    const { data: existingEmail, error: checkError } = await supabase
      .from('enquete_antwoorden')
      .select('email')
      .eq('email', body.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking email:', checkError);
      return NextResponse.json(
        { error: 'Fout bij controleren email' },
        { status: 500 }
      );
    }

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Dit emailadres is al gebruikt voor een eerdere enquête' },
        { status: 409 }
      );
    }

    // Voeg enquête toe aan database
    const { data, error } = await supabase
      .from('enquete_antwoorden')
      .insert({
        interesse: body.interesse,
        bestellingen: body.bestellingen,
        frequentie: body.frequentie,
        tijd: body.tijd,
        straat: body.straat,
        huisnummer: body.huisnummer,
        voornaam: body.voornaam,
        achternaam: body.achternaam,
        email: body.email,
        telefoon: body.telefoon || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Fout bij opslaan van enquête: ' + error.message },
        { status: 500 }
      );
    }

    console.log('Enquête succesvol opgeslagen:', data);

    return NextResponse.json({ 
      success: true, 
      message: 'Enquête succesvol opgeslagen',
      data 
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Interne server fout: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
