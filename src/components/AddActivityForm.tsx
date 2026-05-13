'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddActivityForm({
  addActivityAction,
  workspaceId,
  entityType,
  entityId,
}: {
  addActivityAction: (formData: FormData) => Promise<{ error?: string } | void>;
  workspaceId: string;
  entityType: 'leadId' | 'dealId' | 'contactId';
  entityId: string;
}) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('content', content);
    formData.append('type', 'NOTE');
    formData.append('workspaceId', workspaceId);
    formData.append(entityType, entityId);

    const result = await addActivityAction(formData);
    setIsSubmitting(false);

    if (result && result.error) {
      toast.error(result.error);
    } else {
      toast.success('Note added successfully');
      setContent('');
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 pt-4 border-t border-border">
      <textarea
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-muted/30 border border-border rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Add a note or log an activity..."
        rows={3}
      ></textarea>
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-4 py-2 bg-accent text-accent-foreground font-medium text-sm rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post Note'}
        </button>
      </div>
    </form>
  );
}
