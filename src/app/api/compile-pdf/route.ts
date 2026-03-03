// src/app/api/compile-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { latex } = await req.json();

    if (!latex) {
      return NextResponse.json({ error: 'LaTeX code is required' }, { status: 400 });
    }

    // Using latex.ytotech.com (LaTeX.online)
    // API: POST https://latex.ytotech.com/builds/sync
    // With JSON body: { compiler: "pdflatex", resources: [{ main: true, content: "..." }] }
    
    const latexOnlineResponse = await fetch('https://latex.ytotech.com/builds/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'pdflatex',
        resources: [
          {
            main: true,
            content: latex,
          },
        ],
      }),
    });

    if (!latexOnlineResponse.ok) {
      // Try alternative: latexonline.cc
      const altResponse = await fetch(`https://latexonline.cc/compile?text=${encodeURIComponent(latex)}`, {
        method: 'GET',
      });

      if (!altResponse.ok) {
        return NextResponse.json(
          { message: 'LaTeX compilation failed. Check your LaTeX code for errors.' },
          { status: 422 }
        );
      }

      const pdfBuffer = await altResponse.arrayBuffer();
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="resume.pdf"',
        },
      });
    }

    const pdfBuffer = await latexOnlineResponse.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Compile PDF error:', error);
    return NextResponse.json({ message: 'Failed to compile PDF' }, { status: 500 });
  }
}
