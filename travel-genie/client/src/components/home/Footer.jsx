import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Destinations", href: "#destinations" },
      { name: "AI Planner", route: "/dashboard/trips/create" },
      { name: "Kam Air Flights", route: "/flights" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Kam Air Directory", route: "/kam-air" },
      { name: "AI Recommendations", route: "/dashboard/recommendations" },
      { name: "Travel Memories", route: "/dashboard/memory" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Kam Air Schedules", route: "/kam-air#schedules" },
      { name: "Baggage Guide", route: "/kam-air#baggage" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Support", href: "mailto:support@travelgenie.com" },
    ],
  },
];

const socials = [
  { icon: FaInstagram, name: "Instagram", url: "https://instagram.com" },
  { icon: FaTwitter, name: "Twitter", url: "https://twitter.com" },
  { icon: FaGithub, name: "Github", url: "https://github.com" },
  { icon: FaLinkedin, name: "LinkedIn", url: "https://linkedin.com" },
];

function Footer() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLinkClick = (item, e) => {
    if (item.route) {
      e.preventDefault();
      if (!user && item.route.startsWith("/dashboard")) {
        navigate(`/signup?redirect=${encodeURIComponent(item.route)}`);
      } else {
        navigate(item.route);
      }
    } else if (item.href?.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/${item.href}`);
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#07111F] text-gray-900 dark:text-white pt-14 pb-6 border-t border-gray-200/50 dark:border-white/5">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:px-20">
        {/* Footer Main */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link to="/" className="inline-flex items-center gap-2 group">
              <Sparkles className="text-cyan-500 transition-transform group-hover:rotate-12" />
              <h3 className="text-2xl font-bold">
                Travel<span className="text-cyan-500">Genie</span>
              </h3>
            </Link>

            <p className="mt-4 max-w-sm leading-7 text-gray-600 dark:text-gray-400">
              Your AI-powered travel companion. Create smart itineraries,
              discover destinations, search Kam Air flights, and organize
              unforgettable journeys.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:-translate-y-1 hover:bg-cyan-500 hover:text-white dark:bg-white/10 dark:text-white cursor-pointer"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-lg">{section.title}</h4>

              <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href?.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="transition hover:text-cyan-500 dark:hover:text-cyan-400 inline-block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleLinkClick(link, e)}
                        className="cursor-pointer transition hover:text-cyan-500 dark:hover:text-cyan-400 hover:translate-x-1 text-left inline-block"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-200 dark:border-white/10 pt-5 flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:justify-between items-center">
          <p>© {new Date().getFullYear()} TravelGenie. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Official Kam Air Demo Integration</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>AI Powered Travel Experience</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
