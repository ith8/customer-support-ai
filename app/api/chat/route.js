// app/api/chat/route.js

import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

export const config = {
  runtime: 'experimental-edge',
};

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received payload:', body);

    const { messages } = body;

    if (!messages) {
      console.error('No messages found in the request');
      return NextResponse.json({ error: 'No messages found' }, { status: 400 });
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      stream: true,
    });

    console.log('OpenAI response:', response);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            break;
          }
          controller.enqueue(decoder.decode(value));
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
