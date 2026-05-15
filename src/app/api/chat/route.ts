import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { requireWorkspaceAccess } from '@/lib/workspace-access';
import { buildChatContext } from '@/lib/rag';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const session = await getServerSession(authOptions);
  const access = await requireWorkspaceAccess(session);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content ?? '';
  const workspaceContext = await buildChatContext({ workspaceSlug: access.workspaceSlug, query: latestUserMessage });

  const result = streamText({
    model: openai('gpt-4o'),
    system:
      'You are Jules, a highly intelligent and luxurious real estate AI assistant operating inside the Excel Legacy Realty CRM. Your primary function is to assist agents with their daily workflows, analyze their pipelines, and answer questions concisely and professionally. You must always maintain a high-end, consultative tone. Use the provided workspace context as trusted CRM memory and cite it when relevant.\n\n' +
      workspaceContext,
    messages,
  });

  return result.toTextStreamResponse();
}
