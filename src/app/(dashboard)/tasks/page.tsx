import prisma from '@/lib/prisma';
import AddTaskModal from '@/components/AddTaskModal';

async function addTask(formData: FormData) {
  'use server';

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;
  const workspaceId = formData.get('workspaceId') as string;

  if (!title || !workspaceId) return;

  await prisma.task.create({
    data: {
      title,
      description,
      priority: priority || 'MEDIUM',
      workspaceId,
    },
  });
}

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: [{ completed: 'asc' }, { createdAt: 'desc' }],
  });

  const workspaces = await prisma.workspace.findMany();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your to-dos and workflow steps.</p>
        </div>
        <div className="flex gap-2">
          <AddTaskModal addTaskAction={addTask} workspaces={workspaces} />
        </div>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4 items-center bg-muted/20">
          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <select className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Tasks</option>
            <option>Incomplete</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="p-2 space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-4 p-4 rounded-lg border ${task.completed ? 'bg-muted/50 border-transparent opacity-60' : 'bg-background border-border shadow-sm'}`}
            >
              <div className="mt-0.5">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-border text-primary"
                  defaultChecked={task.completed}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4
                    className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {task.title}
                  </h4>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                      task.priority === 'HIGH'
                        ? 'bg-red-500/10 text-red-600 border-red-500/20'
                        : task.priority === 'MEDIUM'
                          ? 'bg-secondary/10 text-secondary-foreground border-secondary/20'
                          : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                )}
                <div className="flex gap-4 mt-3 text-xs text-muted-foreground font-medium">
                  {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                  <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No tasks found. Create one to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
