import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export const config = {
  runtime: 'experimental-edge',
};

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    if (!messages) {
      return NextResponse.json({ error: 'No messages found' }, { status: 400 });
    }

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // Ensure this is a valid model you have access to
      messages: messages,
      stream: true,
    });

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
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
