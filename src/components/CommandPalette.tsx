'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, User, Briefcase, CheckSquare, Users, Loader2 } from 'lucide-react';

type SearchResult = {
  id: string;
  title: string;
  type: 'lead' | 'contact' | 'deal' | 'task';
  subtitle?: string;
  url: string;
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // Reset results when query is cleared
  if (!query && (results.length > 0 || loading)) {
    setResults([]);
    setLoading(false);
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();

    if (!query.trim()) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Search failed:', error);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const onSelect = (result: SearchResult) => {
    setOpen(false);
    router.push(result.url);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-md hover:bg-muted/50 transition-colors w-full max-w-sm"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">Search CRM...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Search"
        className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      >
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="relative w-full max-w-2xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center px-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <Command.Input
              autoFocus
              placeholder="Search leads, contacts, deals, tasks..."
              value={query}
              onValueChange={setQuery}
              className="flex-1 h-14 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            {loading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground ml-3" />}
          </div>

          <Command.List className="max-h-[350px] overflow-y-auto p-2 scroll-py-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              {loading ? 'Searching...' : 'No results found.'}
            </Command.Empty>

            {results.length > 0 && (
              <div className="space-y-4">
                {['lead', 'contact', 'deal', 'task'].map((type) => {
                  const typeResults = results.filter((r) => r.type === type);
                  if (typeResults.length === 0) return null;

                  return (
                    <Command.Group
                      key={type}
                      heading={
                        <span className="px-2 mb-2 block text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          {type}s
                        </span>
                      }
                    >
                      {typeResults.map((result) => (
                        <Command.Item
                          key={result.id}
                          onSelect={() => onSelect(result)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-default select-none outline-none aria-selected:bg-primary/10 aria-selected:text-primary group transition-colors"
                        >
                          {result.type === 'lead' && <Users className="w-4 h-4" />}
                          {result.type === 'contact' && <User className="w-4 h-4" />}
                          {result.type === 'deal' && <Briefcase className="w-4 h-4" />}
                          {result.type === 'task' && <CheckSquare className="w-4 h-4" />}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{result.title}</span>
                            {result.subtitle && (
                              <span className="text-xs text-muted-foreground group-aria-selected:text-primary/70">
                                {result.subtitle}
                              </span>
                            )}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  );
                })}
              </div>
            )}
          </Command.List>

          <div className="flex items-center justify-between p-4 border-t border-border bg-muted/20 text-[10px] text-muted-foreground">
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded border bg-background px-1">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border bg-background px-1">↵</kbd> Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border bg-background px-1">esc</kbd> Close
              </span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-secondary">
              Powered by Jules AI
            </div>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
