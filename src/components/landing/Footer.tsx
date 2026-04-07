const links = [
  { label: "Fonctionnalités", href: "#solution" },
  { label: "Marché", href: "#marche" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#cta" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        {/* Logo */}
        <a href="#" className="text-xl font-semibold tracking-tight text-white/80">
          el<span className="text-teal">i</span>ntys
        </a>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/30 transition-colors hover:text-white/60"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex flex-col items-end gap-1 text-right">
          <a
            href="mailto:hello@elintys.com"
            className="text-sm text-white/30 transition-colors hover:text-white/60"
          >
            hello@elintys.com
          </a>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Elintys. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
