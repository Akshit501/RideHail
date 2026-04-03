/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Shield,
  Star,
  Smartphone,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  Play,
  Apple,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DynamicStatsSection from "./DynamicSection";
import { useGetDashboardStatsQuery } from "@/redux/analytics/analytics.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";

// --- Types ---
interface NavItem {
  label: string;
  href: string;
  isMega?: boolean;
}

const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data, isLoading } = useGetDashboardStatsQuery(undefined);
  const stats = data?.data || data;
  const navigate = useNavigate();
  const { data: userRes } = useUserInfoQuery(undefined);
  const user = userRes?.data;
  // Scroll visibility for sticky navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Ride", href: "/explore", isMega: true },
    { label: "Drive", href: "/drive" },
    { label: "Services", href: "/services" },
    { label: "Safety", href: "/safety" },
    { label: "About", href: "/about" },
  ];
  const handleBooking = () => {
    // ১. ডাটা লোড হচ্ছে কি না চেক করা (সেফটি চেক)
    if (isLoading) return;

    // ২. যদি ইউজার লগইন না থাকে
    if (!user?.email) {
      toast.error("Please login first to book a ride!");
      navigate("/login");
      return;
    }

    // ৩. যদি লগইন থাকে কিন্তু সে 'RIDER' না হয় (যেমন Admin বা Driver)
    if (user.role !== "RIDER") {
      // এখানে navigate করছি না, তাই সে হোমপেজেই থাকবে।
      toast.warning(
        `Permission Denied! You are logged in as a ${user.role}. Only Riders can book trips.`
      );
      return;
    }

    // ৪. ইউজার যদি RIDER হয়, তবেই ড্যাশবোর্ডে যাবে
    navigate("/rider/bookings");
  };
  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen font-sans`}>
      <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* 2. HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                Reliable Rides Only
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold mt-6 leading-tight">
                Your Journey <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                  Redefined.
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mt-6 max-w-lg">
                Book a ride in seconds, track your driver in real-time, and
                reach your destination safely with Ride Hail.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Button
                  onClick={handleBooking}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-indigo-200 dark:shadow-none flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  Book Now <ArrowRight size={20} />
                </Button>

                {/* --- How it Works Button with Smooth Scroll --- */}
                <button
                  onClick={() =>
                    document
                      .getElementById("how-it-works-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center gap-2 font-bold px-8 py-4 hover:opacity-80 transition-all"
                >
                  <PlayCircle className="text-indigo-600" /> How it Works
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
                alt="App Showcase"
                className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500"
              />

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100 dark:border-slate-700">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-black text-xl">
                    {isLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      `${stats?.users?.drivers || 0}+ Drivers`
                    )}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Verified & Available
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. STATISTICS */}
        <DynamicStatsSection></DynamicStatsSection>

        {/* 4. SERVICES / CATEGORIES */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold">
                Solutions for Everyone
              </h2>
              <p className="text-slate-500 mt-4">
                We offer a wide range of services to meet your daily needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users size={32} />,
                  title: "Daily Commute",
                  desc: "Reliable cars for your everyday office and home trips.",
                },
                {
                  icon: <Zap size={32} />,
                  title: "Ride Hail Flash",
                  desc: "Need a bike to beat the traffic? Our fastest service.",
                },
                {
                  icon: <Shield size={32} />,
                  title: "Ride Hail Business",
                  desc: "Premium vehicles for your professional meetings.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group p-10 rounded-3xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl transition-all"
                >
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold mt-6">{card.title}</h3>
                  <p className="text-slate-500 mt-4 leading-relaxed">
                    {card.desc}
                  </p>
                  <Link
                    to="/explore"
                    className="mt-6 flex items-center gap-2 font-bold text-indigo-600"
                  >
                    Learn More <ArrowRight size={18} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS */}
        <section
          id="how-it-works-section"
          className="py-24 bg-slate-950 text-white rounded-[3rem] mx-4 lg:mx-10 overflow-hidden relative"
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Book in 3 <br /> Simple Steps.
                </h2>
                <div className="mt-12 space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Set Destination",
                      text: "Open the app and enter where you want to go.",
                    },
                    {
                      step: "02",
                      title: "Confirm Driver",
                      text: "Review fare and get matched with the nearest driver.",
                    },
                    {
                      step: "03",
                      title: "Arrive Safely",
                      text: "Follow your trip in real-time and pay cashless.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <span className="text-3xl font-black text-indigo-500 opacity-50">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <p className="text-slate-400 mt-1">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800"
                  alt="Process"
                  className="rounded-3xl shadow-2xl border-4 border-slate-800"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full"></div>
        </section>

        {/* 6. HIGHLIGHTS / SAFETY */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="bg-[#0F172B] rounded-3xl p-12 text-white flex flex-col lg:flex-row justify-between items-center gap-10">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={28} className="text-indigo-200" />
                  <span className="font-bold tracking-widest uppercase text-sm text-indigo-200">
                    Safety First
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold">
                  Your safety is our top priority.
                </h2>
                <p className="text-indigo-100 mt-6 text-lg max-w-2xl">
                  With 24/7 support, emergency SOS buttons, and live trip
                  sharing, we make sure you reach home without a worry.
                </p>
              </div>
              <Link
                to="/safety"
                className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black hover:scale-105 transition-transform whitespace-nowrap"
              >
                Our Safety Standards
              </Link>
            </div>
          </div>
        </section>

        {/* 7. APP DOWNLOAD CTA */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
                alt="App Download"
                className="rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-900"
              />
            </motion.div>

            <div className="space-y-8">
              <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                Take the <br />
                <span className="text-indigo-600">Ride Hail</span> with you.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">
                Download our mobile app for the fastest booking experience, live
                driver tracking, and exclusive app-only discounts.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {/* --- App Store Button --- */}
                <button
                  onClick={() =>
                    toast.info(
                      "iOS App is currently in development. Stay tuned!"
                    )
                  }
                  className="group flex items-center gap-3 bg-slate-950 hover:bg-black text-white px-6 py-3 rounded-2xl transition-all hover:scale-105 active:scale-95 border border-slate-800"
                >
                  <Apple size={32} fill="currentColor" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
                      Download on the
                    </p>
                    <p className="text-xl font-bold leading-none">App Store</p>
                  </div>
                </button>

                {/* --- Google Play Button --- */}
                <button
                  onClick={() =>
                    toast.info("Android App is coming soon to Play Store!")
                  }
                  className="group flex items-center gap-3 bg-slate-950 hover:bg-black text-white px-6 py-3 rounded-2xl transition-all hover:scale-105 active:scale-95 border border-slate-800"
                >
                  {/* Custom Play Store Icon look */}
                  <div className="bg-gradient-to-br from-blue-500 to-green-500 p-1.5 rounded-lg text-white">
                    <Play size={20} fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
                      Get it on
                    </p>
                    <p className="text-xl font-bold leading-none">
                      Google Play
                    </p>
                  </div>
                </button>
              </div>

              {/* Additional Context - Intuitive Hint */}
              <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-600"
                    >
                      U{i}
                    </div>
                  ))}
                </div>
                <p>Joined by 10k+ users this month</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3.5 WHY CHOOSE US SECTION (Carousel এর পরিবর্তে) */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Experience the <span className="text-indigo-600">Future</span>{" "}
                  of Mobility.
                </h2>
                <p className="text-slate-500 mt-4 text-lg">
                  We combine cutting-edge technology with world-class service to
                  make your every journey memorable.
                </p>
              </div>
              <div className="hidden md:block">
                <Link
                  to="/about"
                  className="text-indigo-600 font-bold flex items-center gap-2 group"
                >
                  See our story{" "}
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Fixed Pricing",
                  desc: "No hidden costs. You see the price before you book.",
                  icon: <Zap className="text-amber-500" />,
                  bg: "bg-amber-50 dark:bg-amber-900/10",
                },
                {
                  title: "Verified Drivers",
                  desc: "Every driver goes through a multi-step background check.",
                  icon: <Shield className="text-blue-500" />,
                  bg: "bg-blue-50 dark:bg-blue-900/10",
                },
                {
                  title: "24/7 Support",
                  desc: "Dedicated help center to assist you at any time of the day.",
                  icon: <Smartphone className="text-purple-500" />,
                  bg: "bg-purple-50 dark:bg-purple-900/10",
                },
                {
                  title: "Fast Pickup",
                  desc: "Average wait time is less than 5 minutes in city areas.",
                  icon: <Star className="text-green-500" />,
                  bg: "bg-green-50 dark:bg-green-900/10",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
                >
                  <div
                    className={`${feature.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}
                  >
                    {React.cloneElement(feature.icon as React.ReactElement, {
                      size: 28,
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ SECTION */}
        <section className="py-24 container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How do I pay for my ride?",
                a: "You can pay via Cash, Credit/Debit Cards, or Digital Wallets linked to your Ride Hail account.",
              },
              {
                q: "What if I lose an item in the car?",
                a: "Don't worry! You can use the 'In-app Help' to contact your driver within 24 hours.",
              },
              {
                q: "Can I book a ride for someone else?",
                a: "Yes, you can simply change the pickup location and share the driver details with them.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
              >
                <button className="w-full text-left p-6 font-bold flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-900">
                  {faq.q} <ChevronDown size={20} />
                </button>
                <div className="p-6 pt-0 text-slate-500 dark:text-slate-400">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
