import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  MapPin,
  Eye,
  Trash2,
  UserCheck,
  Smartphone,
  Globe,
  ArrowRight,
  ChevronRight,
  Scale,
} from "lucide-react";
import { Link } from "react-router";

const PrivacyPolicy = () => {
  const lastUpdated = "Dec 24, 2025";
  const appName = "Ride Hail";
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = [
    { id: "intro", label: "Overview", icon: Eye },
    { id: "data-we-collect", label: "Data Collection", icon: Smartphone },
    { id: "how-we-use", label: "Usage", icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950 transition-colors duration-500">
      {/* 🚀 Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-12">
        {/* 📋 Left Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28 space-y-2">
            <div className="mb-8 p-6 bg-indigo-600 rounded-[2rem] text-white shadow-xl shadow-indigo-200 dark:shadow-none">
              <Scale className="mb-4" size={32} />
              <h3 className="font-black text-xl">Legal Center</h3>
              <p className="text-indigo-100 text-xs mt-2 font-medium leading-relaxed">
                We believe in 100% transparency regarding your data.
              </p>
            </div>

            <nav className="space-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all group"
                >
                  <s.icon
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  {s.label}
                  <ChevronRight
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* 📝 Main Content */}
        <article className="flex-1 max-w-3xl">
          {/* Header */}
          <header className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <ShieldCheck size={14} /> Trust & Safety Verified
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
              Privacy <span className="text-indigo-600">Policy</span>
            </h1>
            <div className="flex items-center gap-4 text-slate-400 dark:text-neutral-500 text-sm font-bold uppercase tracking-tighter">
              <span>Version 2.4</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>Updated: {lastUpdated}</span>
            </div>
          </header>

          <div className="space-y-16">
            {/* Overview Section */}
            <section id="intro" className="scroll-mt-32">
              <div className="p-8 bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-slate-100 dark:border-neutral-800 shadow-sm leading-relaxed text-slate-600 dark:text-neutral-300">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                  The Big Picture
                </h2>
                <p>
                  At {appName}, we process personal information to provide
                  reliable ride‑hailing and safety features. This policy
                  outlines our commitment to your privacy. By using our
                  services, you're trusting us with your data, and we don't take
                  that lightly.
                </p>
              </div>
            </section>

            {/* Data Collection Grid */}
            <section id="data-we-collect" className="scroll-mt-32">
              <SectionTitle title="Information We Collect" />
              <div className="grid gap-4 mt-8">
                <DataCard
                  icon={<Smartphone className="text-blue-500" />}
                  title="Account Details"
                  items={[
                    "Full Name & Email",
                    "Verified Phone Number",
                    "Profile Photo (Encrypted)",
                  ]}
                />
                <DataCard
                  icon={<MapPin className="text-rose-500" />}
                  title="Location Data"
                  items={[
                    "Real-time GPS Tracking",
                    "Background location for Drivers",
                    "Frequent Destinations",
                  ]}
                />
                <DataCard
                  icon={<Lock className="text-emerald-500" />}
                  title="Payment Info"
                  items={[
                    "Masked Card Numbers",
                    "Transaction History",
                    "Billing Address",
                  ]}
                />
              </div>
            </section>

            {/* Simplified Terms Section */}
            <section id="how-we-use" className="scroll-mt-32">
              <SectionTitle title="How We Use It" />
              <div className="mt-8 space-y-6">
                <StepItem
                  number="01"
                  title="Service Delivery"
                  desc="To match you with the best available drivers nearby."
                />
                <StepItem
                  number="02"
                  title="Safety First"
                  desc="Emergency SOS and real-time trip monitoring for your protection."
                />
                <StepItem
                  number="03"
                  title="Better Experience"
                  desc="Personalizing your routes and saving your favorite places."
                />
              </div>
            </section>

            {/* Footer Notice */}
            <footer className="pt-12 border-t border-slate-200 dark:border-neutral-800">
              <div className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Have questions?</h3>
                  <p className="text-slate-400 mb-8 text-sm">
                    Our privacy team is available 24/7 to answer your concerns.
                  </p>
                  <Link to="/contact">
                    <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl font-bold transition-all group">
                      Contact Support{" "}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </Link>
                </div>
                <ShieldCheck
                  className="absolute -right-10 -bottom-10 text-white/5"
                  size={240}
                />
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
};

// --- Helper Components ---

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-4">
    <div className="h-8 w-1.5 bg-indigo-600 rounded-full" />
    {title}
  </h2>
);

const DataCard = ({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="flex gap-6 p-6 bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 rounded-3xl shadow-sm transition-all"
  >
    <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-neutral-800 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-black text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="px-3 py-1 bg-slate-50 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 text-[10px] font-bold rounded-lg uppercase tracking-wider"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const StepItem = ({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) => (
  <div className="flex gap-6 items-start group">
    <span className="text-4xl font-black text-slate-200 dark:text-neutral-800 group-hover:text-indigo-600 transition-colors">
      {number}
    </span>
    <div>
      <h4 className="font-black text-lg text-slate-800 dark:text-white mb-1">
        {title}
      </h4>
      <p className="text-slate-500 dark:text-neutral-400 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

export default PrivacyPolicy;
