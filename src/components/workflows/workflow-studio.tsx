"use client";

import { useEffect, useMemo, useState } from 'react';

type Tone = 'primary' | 'secondary' | 'ghost';

type WorkflowActionId =
  | 'save'
  | 'validate'
  | 'preview'
  | 'review'
  | 'package'
  | 'signature'
  | 'submit'
  | 'docs'
  | 'media';

type WorkflowAction = {
  id: WorkflowActionId;
  label: string;
  tone: Tone;
};

type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'number';

type WorkflowField = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  source?: string;
  helper?: string;
};

type WorkflowSection = {
  title: string;
  description: string;
  fields: WorkflowField[];
};

type SummaryItem = {
  label: string;
  value: string;
  source?: string;
  accent?: boolean;
};

type ActivityEntry = {
  title: string;
  detail: string;
  timestamp: string;
};

type WorkflowStudioProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  routeLabel: string;
  storageKey: string;
  summaryItems: SummaryItem[];
  sections: WorkflowSection[];
  actions: WorkflowAction[];
  validationTitle: string;
  validationNotes: string[];
  mobileNotes: string[];
  provenanceTitle: string;
  provenanceNotes: string[];
  defaultValues: Record<string, string>;
  activitySeed: ActivityEntry[];
};

const toneStyles: Record<Tone, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
  ghost: 'border border-border bg-background text-foreground hover:bg-muted',
};

function formatTimestamp(value: string | null) {
  if (!value) return 'Not saved yet';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function ActionButton({ action, onClick }: { action: WorkflowAction; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${toneStyles[action.tone]}`}
    >
      {action.label}
    </button>
  );
}

function SummaryCard({ item }: { item: SummaryItem }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {item.label}
          </p>
          <p className={`mt-2 text-sm font-semibold ${item.accent ? 'text-secondary' : 'text-foreground'}`}>
            {item.value}
          </p>
        </div>
        {item.source ? (
          <span className="rounded-full border border-border bg-background px-2 py-1 text-[11px] font-semibold text-muted-foreground">
            {item.source}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-1">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: WorkflowField;
  value: string;
  onChange: (next: string) => void;
}) {
  const baseClass =
    'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary';

  return (
    <label className="block space-y-2">
      <span className="flex items-center justify-between gap-3 text-sm font-medium text-foreground">
        {field.label}
        {field.source ? (
          <span className="rounded-full border border-border bg-muted/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {field.source}
          </span>
        ) : null}
      </span>
      {field.type === 'textarea' ? (
        <textarea
          className={`${baseClass} min-h-[112px] resize-y`}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : field.type === 'select' ? (
        <select
          className={baseClass}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Select one</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={baseClass}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {field.helper ? <p className="text-xs leading-5 text-muted-foreground">{field.helper}</p> : null}
    </label>
  );
}

function ActivityFeed({ activity }: { activity: ActivityEntry[] }) {
  return (
    <div className="space-y-3">
      {activity.map((entry) => (
        <div key={`${entry.timestamp}-${entry.title}`} className="rounded-xl border border-border bg-muted/20 p-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">{entry.title}</p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">{entry.detail}</p>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {entry.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WorkflowStudio({
  eyebrow,
  title,
  subtitle,
  routeLabel,
  storageKey,
  summaryItems,
  sections,
  actions,
  validationTitle,
  validationNotes,
  mobileNotes,
  provenanceTitle,
  provenanceNotes,
  defaultValues,
  activitySeed,
}: WorkflowStudioProps) {
  const [draft, setDraft] = useState<Record<string, string>>(defaultValues);
  const [activity, setActivity] = useState<ActivityEntry[]>(activitySeed);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [banner, setBanner] = useState('Draft ready for editing.');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as {
          draft?: Record<string, string>;
          activity?: ActivityEntry[];
          lastSavedAt?: string | null;
          banner?: string;
        };

        /* eslint-disable react-hooks/set-state-in-effect */
        if (parsed.draft) setDraft({ ...defaultValues, ...parsed.draft });
        if (parsed.activity?.length) setActivity(parsed.activity);
        if (parsed.lastSavedAt) setLastSavedAt(parsed.lastSavedAt);
        if (parsed.banner) setBanner(parsed.banner);
        /* eslint-enable react-hooks/set-state-in-effect */
      } catch {
        // If the local draft is corrupt, fall back to the default mock CRM state.
      }
    }

    setHydrated(true);
  }, [defaultValues, storageKey]);

  const validationIssues = useMemo(() => {
    return sections.flatMap((section) =>
      section.fields
        .filter((field) => field.required && !draft[field.key]?.trim())
        .map((field) => `${field.label} is required`),
    );
  }, [draft, sections]);

  const filledCount = useMemo(() => {
    const keys = sections.flatMap((section) => section.fields.map((field) => field.key));
    return keys.filter((key) => draft[key]?.trim()).length;
  }, [draft, sections]);

  const totalFields = sections.reduce((total, section) => total + section.fields.length, 0);
  const completionLabel = `${filledCount}/${totalFields} fields populated`;

  function updateField(key: string, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
    setBanner('Unsaved changes detected.');
  }

  function pushActivity(title: string, detail: string) {
    const next: ActivityEntry = {
      title,
      detail,
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };

    setActivity((current) => [next, ...current].slice(0, 8));
  }

  function saveDraft(note = 'Draft saved locally.') {
    const timestamp = new Date().toISOString();
    const payload = {
      draft,
      activity,
      lastSavedAt: timestamp,
      banner: note,
    };

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, JSON.stringify(payload));
    }

    setLastSavedAt(timestamp);
    setDirty(false);
    setBanner(note);
    pushActivity('Draft saved', note);
  }

  function handleAction(id: WorkflowActionId) {
    if (id === 'save') {
      saveDraft();
      return;
    }

    if (id === 'validate') {
      const message =
        validationIssues.length === 0
          ? 'Validation passed: no blocking issues found.'
          : `Validation found ${validationIssues.length} item(s) to resolve.`;
      setBanner(message);
      pushActivity('Validation run', message);
      return;
    }

    if (id === 'review') {
      saveDraft('Sent to broker/team lead for review.');
      pushActivity('Review requested', 'The current draft was routed for human approval.');
      return;
    }

    if (id === 'preview') {
      setBanner('Preview generated for quick review on desktop and mobile.');
      pushActivity('Preview generated', 'The current draft preview is ready for sharing.');
      return;
    }

    if (id === 'package') {
      saveDraft('Offer package generated and stored in the CRM.');
      pushActivity('Package generated', 'Supporting docs and offer contents were assembled.');
      return;
    }

    if (id === 'signature') {
      if (validationIssues.length > 0) {
        setBanner('Resolve validation issues before sending for signature.');
        pushActivity('Signature blocked', 'The draft still has blocking validation issues.');
        return;
      }

      saveDraft('Sent for signature from the workflow shell.');
      pushActivity('Sent for signature', 'The package is ready for e-signature handoff.');
      return;
    }

    if (id === 'submit') {
      if (validationIssues.length > 0) {
        setBanner('Resolve validation issues before submitting.');
        pushActivity('Submission blocked', 'The workflow is waiting for required fields.');
        return;
      }

      saveDraft('Submission prepared and queued for authorized handoff.');
      pushActivity('Submission queued', 'The draft can now be sent to the external system.');
      return;
    }

    if (id === 'docs') {
      setBanner('Document and supporting file drawer opened.');
      pushActivity('Docs opened', 'The user can attach source docs or supporting files.');
      return;
    }

    if (id === 'media') {
      setBanner('Media drawer opened for photos and floorplans.');
      pushActivity('Media opened', 'The user can upload or review listing media.');
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.14),_transparent_34%),linear-gradient(180deg,_var(--background),_var(--background))] text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
        <header className="rounded-3xl border border-border bg-background/95 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                {eyebrow}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{routeLabel}</p>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                  {subtitle}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {actions.map((action) => (
                <ActionButton key={action.id} action={action} onClick={() => handleAction(action.id)} />
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
          <aside className="space-y-6">
            <div className="rounded-2xl border border-secondary/40 bg-secondary/5 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Draft status
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold text-foreground">{banner}</p>
                <p className="text-sm text-muted-foreground">{completionLabel}</p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="rounded-full border border-border bg-background px-2 py-1">
                    {dirty ? 'Unsaved' : 'Saved'}
                  </span>
                  <span className="rounded-full border border-border bg-background px-2 py-1">
                    {hydrated ? 'Local draft ready' : 'Hydrating'}
                  </span>
                  <span className="rounded-full border border-border bg-background px-2 py-1">
                    Last saved {formatTimestamp(lastSavedAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-background p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Mock CRM context
              </p>
              <div className="space-y-3">
                {summaryItems.map((item) => (
                  <SummaryCard key={item.label} item={item} />
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl border border-border bg-background p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2">
                {sections.map((section) => (
                  <div key={section.title} className="space-y-4 rounded-2xl border border-border bg-muted/10 p-4">
                    <SectionHeader title={section.title} description={section.description} />
                    <div className="grid gap-4 md:grid-cols-2">
                      {section.fields.map((field) => (
                        <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                          <FieldEditor
                            field={field}
                            value={draft[field.key] ?? ''}
                            onChange={(next) => updateField(field.key, next)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {validationTitle}
                </p>
                <div className="mt-4 space-y-3">
                  {validationNotes.map((note) => (
                    <div key={note} className="rounded-xl border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
                      {note}
                    </div>
                  ))}
                  {validationIssues.length > 0 ? (
                    <div className="rounded-xl border border-secondary/40 bg-secondary/10 p-3 text-sm text-foreground">
                      <p className="font-semibold text-secondary">Blocking validation items</p>
                      <ul className="mt-2 space-y-1">
                        {validationIssues.map((issue) => (
                          <li key={issue}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">
                      No blocking validation issues right now.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {provenanceTitle}
                </p>
                <div className="mt-4 space-y-3">
                  {provenanceNotes.map((note) => (
                    <div key={note} className="rounded-xl border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
                      {note}
                    </div>
                  ))}
                  <div className="rounded-xl border border-border bg-background p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Mobile behavior
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                      {mobileNotes.map((note) => (
                        <li key={note} className="flex gap-2">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                CRM activity
              </p>
              <div className="mt-4">
                <ActivityFeed activity={activity} />
              </div>
            </div>
          </aside>
        </section>

        <section className="sticky bottom-4 rounded-3xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Mobile-safe action bar
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                These controls remain visible so the workflow never feels buried on desktop or mobile.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {actions.map((action) => (
                <ActionButton key={`${action.id}-bottom`} action={action} onClick={() => handleAction(action.id)} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
