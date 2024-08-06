const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

async function testOpenAI() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello! How are you?' },
      ],
    });

    console.log('Response from OpenAI:', response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error from OpenAI:', error);
  }
}

testOpenAI();
