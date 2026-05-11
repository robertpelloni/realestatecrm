import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().or(z.literal('')),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
  workspaceId: z.string().min(1, 'Workspace is required'),
  dueDate: z.string().optional().or(z.literal('')),
  assignedToId: z.string().optional().or(z.literal('')),
});

export type TaskInput = z.infer<typeof taskSchema>;
