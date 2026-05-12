import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system:
      'You are Jules, a highly intelligent and luxurious real estate AI assistant operating inside the Excel Legacy Realty CRM. Your primary function is to assist agents with their daily workflows, analyze their pipelines, and answer questions concisely and professionally. You must always maintain a high-end, consultative tone.',
    messages,
  });

  return result.toTextStreamResponse();
}
