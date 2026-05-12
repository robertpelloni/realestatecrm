import { z } from 'zod';

export const workflowSessionSchema = z.object({
  type: z.string().min(1, 'Workflow type is required'),
  data: z.string().min(2, 'Workflow data cannot be empty'), // JSON string
  workspaceId: z.string().min(1, 'Workspace is required'),
  existingSessionId: z.string().optional().or(z.literal('')),
  leadId: z.string().optional().or(z.literal('')),
  dealId: z.string().optional().or(z.literal('')),
});

export type WorkflowSessionInput = z.infer<typeof workflowSessionSchema>;
