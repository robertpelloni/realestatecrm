'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveWorkflowSession(
  workspaceId: string,
  type: string,
  data: string,
  existingSessionId?: string | null,
  leadId?: string,
  dealId?: string,
) {
  try {
    if (existingSessionId) {
      await prisma.workflowSession.update({
        where: { id: existingSessionId },
        data: {
          data,
          status: 'DRAFT',
          updatedAt: new Date(),
        },
      });
      return { success: true, id: existingSessionId };
    } else {
      const session = await prisma.workflowSession.create({
        data: {
          workspaceId,
          type,
          data,
          status: 'DRAFT',
          leadId: leadId || null,
          dealId: dealId || null,
        },
      });
      return { success: true, id: session.id };
    }
  } catch (error) {
    console.error('Failed to save workflow session:', error);
    return { error: 'Failed to save workflow state' };
  }
}

export async function submitWorkflowSession(sessionId: string) {
  try {
    await prisma.workflowSession.update({
      where: { id: sessionId },
      data: {
        status: 'SUBMITTED',
        updatedAt: new Date(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to submit workflow session:', error);
    return { error: 'Failed to submit workflow' };
  }
}
