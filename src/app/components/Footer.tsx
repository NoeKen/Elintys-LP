
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const links = [
    { name: "À propos", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Mentions légales", href: "#" },
    { name: "Conditions", href: "#" },
    { name: "Confidentialité", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image 
                src="/elintys-logo.png"
                alt="elintys Logo"
                width={120}
                height={30}
              />
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="text-sm text-gray-400">
            <a href="mailto:hello@elintys.com" className="hover:text-white transition-colors">
              hello@elintys.com
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>elintys — La plateforme événementielle de demain.</p>
          <p className="mt-1">© 2025 elintys. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
