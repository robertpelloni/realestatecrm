import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import {
  createEmptyWorkflowSnapshot,
  type WorkflowRecord,
  type WorkflowSnapshot,
} from '@/lib/workflow-state';

const storeFile = path.join(process.cwd(), 'data', 'workflow-state.json');

type WorkflowStore = {
  workflows: Record<string, WorkflowRecord>;
};

async function readStore(): Promise<WorkflowStore> {
  try {
    const raw = await readFile(storeFile, 'utf8');
    const parsed = JSON.parse(raw) as WorkflowStore;
    return { workflows: parsed.workflows ?? {} };
  } catch {
    return { workflows: {} };
  }
}

async function writeStore(store: WorkflowStore) {
  await mkdir(path.dirname(storeFile), { recursive: true });
  await writeFile(storeFile, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

export async function getWorkflowRecord(workflowId: string): Promise<WorkflowRecord | null> {
  const store = await readStore();
  return store.workflows[workflowId] ?? null;
}

export async function saveWorkflowRecord(
  workflowId: string,
  snapshot: WorkflowSnapshot,
): Promise<WorkflowRecord> {
  const store = await readStore();
  const record: WorkflowRecord = {
    workflowId,
    updatedAt: new Date().toISOString(),
    snapshot: {
      ...createEmptyWorkflowSnapshot(),
      ...snapshot,
    },
  };

  store.workflows[workflowId] = record;
  await writeStore(store);
  return record;
}
