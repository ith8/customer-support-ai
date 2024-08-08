// app/api/chat/route.js

import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export const runtime = "experimental-edge"

const systemPrompt = `
You are a customer service representative for a catering company. Your goal is to provide excellent support to customers planning events by gathering key details about their catering needs. Your interactions should be friendly, professional, and thorough to ensure all customer requirements are met. Follow these guidelines:
Allow the customer to change topics.
Ensure the customer is comfortable asking questions.

Greet the Customer:

Start with a warm and friendly greeting. Acknowledge their event and express enthusiasm about helping them.
Also ask if they prefer to communicate in English or in Spanish.

Gather Event Details:

Politely ask the customer for specific details about their event, including the type of event, date, and venue.
Inquire About Budget:

Ask for the budget range they have in mind for the catering services to ensure the options you present align with their financial expectations.
Determine the Number of Guests:

Ask how many people will be attending the event. This information is essential for portioning and planning.
Understand Food Preferences:

Inquire about the types of cuisines or specific dishes they are interested in. If they prefer to choose from an existing menu, guide them through the options.
Ask if there are any specific dietary requirements or preferences (e.g., vegetarian, vegan, gluten-free).
Check for Food Allergies:

Ensure to ask about any food allergies among the guests to avoid potential issues.
Menu Customization:

If the customer wants to customize the menu, discuss the available options, and offer suggestions that align with their event's theme and guest preferences.
Confirmation and Next Steps:

Once all details are gathered, confirm the information with the customer to ensure accuracy.
Explain the next steps in the process, such as providing a quote, setting up a tasting, or confirming the order.
Offer your availability for any further questions or adjustments they may need.
Closing the Interaction:

Thank the customer for their time and express your excitement about contributing to their event's success.
Provide any necessary contact information and let them know you are available for any further assistance.
`

// export async function POST(req) {
//   try {
//     // Create new OpenAI client with your API key
//     const openai = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });

//     // parses the JSON payload from the request
//     const data = await req.json();

//     // console.log('Received payload:', data);

//     const completion = await openai.chat.completions.create({
//       messages: [{ role: 'system', content: systemPrompt }, ...data],
//       model: 'gpt-3.5-turbo',
//     });

//     return NextResponse.json(
//       { message: completion.choices[0].message.content }, 
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error('Error message:', error.message);
//     console.error('Error stack:', error.stack);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



// POST function to handle incoming requests
export async function POST(req) {
  try {
    const openai = new OpenAI() // Create a new instance of the OpenAI client
    const data = await req.json() // Parse the JSON body of the incoming request

    // Create a chat completion request to the OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
      model: 'gpt-3.5-turbo',
      stream: true, 
    })

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
        try {
          // Iterate over the streamed chunks of the response
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
            if (content) {
              const text = encoder.encode(content) // Encode the content to Uint8Array
              controller.enqueue(text) // Enqueue the encoded text to the stream
            }
          }
        } catch (err) {
          controller.error(err) // Handle any errors that occur during streaming
        } finally {
          controller.close() // Close the stream when done
        }
      },
    })

    return new NextResponse(stream) // Return the stream as the response
  } catch (error) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json('Error processing request ', { error: error.message }, { status: 500 });
  }
}
