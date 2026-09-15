import Brand from "./Brand";

const links = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "System Status", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
        <Brand className="h-6 w-auto" />

        <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs text-ink/50">
          {links.map((l, i) => (
            <li key={l.label} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-ink/20">·</span>}
              <a href={l.href} className="transition hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs text-ink/40">
          © Corefinity. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
