/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link } from "react-router";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Send,
  Linkedin,
} from "lucide-react";
import Logo from "@/assets/icon/Logo";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  // নিউজলেটার হ্যান্ডলার
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    // ইমেইল খালি কি না বা সঠিক ফরম্যাটে আছে কি না চেক
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }

    // সাকসেস মেসেজ এবং ইনপুট ক্লিয়ার
    toast.success("Thank you! You've successfully subscribed.");
    setEmail("");
  };

  return (
    <footer className="relative bg-[#05070a] text-slate-300 pt-20 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        {/* Top Section: Branding & Newsletter */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          <div className="lg:col-span-5 space-y-6">
            <Link
              to="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <Logo />
            </Link>
            <p className="text-lg text-slate-400 max-w-md leading-relaxed">
              Experience the next generation of urban mobility. Safe,
              sustainable, and premium rides at the tap of a button. Join
              thousands of happy riders today.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                {
                  icon: <Facebook size={20} />,
                  href: "https://facebook.com/sahajewelkumar",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: <Twitter size={20} />,
                  href: "https://x.com/sahaJewelkumar",
                  color: "hover:bg-sky-500",
                },
                {
                  icon: <Instagram size={20} />,
                  href: "https://instagram.com/sahajewelkumarbd/",
                  color: "hover:bg-pink-600",
                },
                {
                  icon: <Linkedin size={20} />,
                  href: "https://www.linkedin.com/in/sahajewelkumar",
                  color: "hover:bg-blue-700",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-300 ${social.color} hover:text-white hover:-translate-y-1`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="space-y-6">
              <h5 className="text-white font-bold text-lg">Platform</h5>
              <ul className="space-y-4">
                {["About", "Features", "Services", "Pricing"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="group flex items-center gap-2 hover:text-indigo-400 transition-colors"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                      />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h5 className="text-white font-bold text-lg">Support</h5>
              <ul className="space-y-4">
                {["FAQ", "Help Center", "Privacy Policy", "Terms"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="group flex items-center gap-2 hover:text-purple-400 transition-colors"
                      >
                        <ArrowRight
                          size={12}
                          className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                        />
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-6">
              <h5 className="text-white font-bold text-lg">Stay Updated</h5>
              <p className="text-sm text-slate-400">
                Subscribe to get latest news and offers.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="bg-white/5 border-white/10 focus:ring-indigo-500 rounded-xl pr-10 text-slate-200"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section: Direct Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 py-12 border-b border-white/5">
          <a
            href="mailto:jewelsaha072@gmail.com"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <Mail />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                Email Us
              </p>
              <p className="text-sm font-semibold text-slate-200">
                jewelsaha072@gmail.com
              </p>
            </div>
          </a>
          <a
            href="tel:+818050526822"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
              <Phone />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                Call Now
              </p>
              <p className="text-sm font-semibold text-slate-200">
                +81 80 5052 6822
              </p>
            </div>
          </a>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <MapPin />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                Location
              </p>
              <p className="text-sm font-semibold text-slate-200">
                Tokyo, Japan
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} <span className="text-white font-bold">Ride Hail</span>.
            Crafted with ❤️ for a better journey.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link to="/security" className="hover:text-white transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
