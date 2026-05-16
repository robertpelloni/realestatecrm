/**
 * Shared utilities for RAG and CRM data processing.
 */

export function compactText(text: string, limit = 220) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, limit - 1)}…`;
}

export function displayName(firstName?: string | null, lastName?: string | null) {
  return [firstName, lastName].filter(Boolean).join(' ').trim();
}

export function formatCurrency(value?: number | null) {
  if (value == null || Number.isNaN(Number(value))) return 'unpriced';
  return `$${Number(value).toLocaleString('en-US')}`;
}
