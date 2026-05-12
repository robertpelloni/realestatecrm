import type { Session } from 'next-auth';

export const DEFAULT_WORKSPACE_SLUG = 'excel-legacy-team';

export function getWorkspaceSlug(session?: Session | null) {
  return session?.user?.workspaceSlug ?? DEFAULT_WORKSPACE_SLUG;
}

export function getActorId(session?: Session | null) {
  return session?.user?.id ?? null;
}

export function getWorkspaceScope(session?: Session | null) {
  return {
    workspaceSlug: getWorkspaceSlug(session),
    actorId: getActorId(session),
  };
}
