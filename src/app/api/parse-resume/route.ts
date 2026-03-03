// src/app/api/parse-resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.tokenfactory.us-central1.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V3.2',
      messages: [
        {
          role: 'system',
          content:
            'You are a precise resume parser. Extract structured data from resumes ' +
            'and return ONLY valid JSON with no markdown, no code blocks, no explanation. ' +
            'Just raw JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const text = response.choices[0]?.message?.content || '';

    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[parse-resume]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}