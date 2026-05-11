export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background border-b border-border py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-secondary flex items-center justify-center font-bold text-secondary-foreground text-xl">
              E
            </div>
            <h1 className="text-xl font-bold tracking-tight text-primary dark:text-foreground">
              Excel Legacy <span className="font-light text-foreground/70">Realty</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-foreground hover:text-secondary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Leads
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Properties
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Workflows
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium px-4 py-2 rounded-md hover:bg-muted transition-colors">
              Sign In
            </button>
            <button className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-semibold tracking-wide uppercase">
            Intelligent Real Estate OS
          </div>
          <h2 className="text-4xl md:text-6xl font-bold max-w-4xl tracking-tight mb-6 leading-tight">
            The next-generation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              AI CRM
            </span>{' '}
            for top-producing agents
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            A modular, luxury platform combining the power of intelligent lead qualification, voice
            workflows, and MLS parity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Enter Workspace
            </button>
            <button className="px-8 py-3 rounded-md bg-accent text-accent-foreground font-medium text-lg hover:bg-accent/90 transition-colors">
              View Roadmap
            </button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6 bg-muted/50 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 text-2xl">
                  ✨
                </div>
                <h3 className="text-xl font-bold mb-3">AI Lead Qualification</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Automate your follow-ups with intelligent conversational agents that qualify leads
                  24/7 and route them to the right team member.
                </p>
              </div>
              <div className="bg-background p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6 text-2xl">
                  🎙️
                </div>
                <h3 className="text-xl font-bold mb-3">Voice Workflows</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Update CRM records, dictate notes, and manage deals completely hands-free while
                  driving between showings.
                </p>
              </div>
              <div className="bg-background p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-6 text-2xl">
                  🏘️
                </div>
                <h3 className="text-xl font-bold mb-3">Deep MLS Parity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Native integration with MiRealSource, Realcomp, and BS&A for seamless listing
                  search and offer preparation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-secondary flex items-center justify-center font-bold text-secondary-foreground text-xs">
              E
            </div>
            <span className="font-semibold text-sm">Excel Legacy Realty</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Excel Legacy Realty Team. All rights reserved.
          </p>
          <div className="text-xs text-muted-foreground flex gap-4">
            <span>Version 0.3.0</span>
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
