const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certs" },
  { href: "#education", label: "Publications" },
  { href: "#contact", label: "Contact" },
];

export function NavBar() {
  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/70 px-2 py-1.5 backdrop-blur-xl shadow-card">
        <a href="#top" className="px-3 py-1 font-display text-sm font-bold text-gradient">
          SK.
        </a>
        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
