export type WorkflowActivityEntry = {
  title: string;
  detail: string;
  timestamp: string;
};

export type WorkflowSnapshot = {
  draft: Record<string, string>;
  activity: WorkflowActivityEntry[];
  lastSavedAt: string | null;
  banner: string;
};

export type WorkflowRecord = {
  workflowId: string;
  updatedAt: string;
  snapshot: WorkflowSnapshot;
};

export const createEmptyWorkflowSnapshot = (): WorkflowSnapshot => ({
  draft: {},
  activity: [],
  lastSavedAt: null,
  banner: 'Draft ready for editing.',
});
