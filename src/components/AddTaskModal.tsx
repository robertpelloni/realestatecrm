'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTaskModal({
  addTaskAction,
  workspaces,
}: {
  addTaskAction: (formData: FormData) => Promise<void>;
  workspaces: { id: string; name: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    await addTaskAction(formData);
    setIsOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
      >
        + Add Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-xl border border-border shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Title</label>
                <input
                  required
                  name="title"
                  type="text"
                  placeholder="e.g., Call new prospect"
                  className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Optional details..."
                  className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select
                  name="priority"
                  className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Workspace</label>
                <select
                  name="workspaceId"
                  required
                  className="w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {workspaces.map((ws) => (
                    <option key={ws.id} value={ws.id}>
                      {ws.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
