/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/provider/Mode.toggle";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Car,
  Shield,
  Zap,
  Info,
  Phone,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
];

// --- লিঙ্কগুলো এখানে অ্যাড করা হয়েছে ---
const serviceMegaMenu = [
  {
    title: "City Rides",
    desc: "Daily commute within the city",
    icon: <Car className="text-indigo-500" />,
    href: "/services/city-rides",
  },
  {
    title: "Intercity",
    desc: "Go beyond city boundaries",
    icon: <Zap className="text-amber-500" />,
    href: "/pricing",
  },
  {
    title: "Ride Hail Shield",
    desc: "Premium safety for your family",
    icon: <Shield className="text-emerald-500" />,
    href: "/services/ridex-shield",
  },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out px-4",
        isScrolled
          ? "py-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-800/50"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* 1. Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-indigo-600 to-sky-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-md">
                <span className="text-white font-black text-sm">RH</span>
              </div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-slate-900 to-indigo-700 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent">Ride Hail</span>
            </Link>

            {/* 2. Desktop Navigation Menu */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-1">
                {navigationLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={link.href}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* --- MEGA MENU --- */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent font-semibold text-slate-600 dark:text-slate-300">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[550px] grid-cols-2 p-4 gap-3 bg-white dark:bg-slate-950 shadow-2xl">
                      <div className="col-span-1 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl flex flex-col justify-between">
                        <div>
                          <Car className="mb-4 text-indigo-600" size={32} />
                          <h4 className="font-bold text-xl leading-tight">
                            Fastest Booking
                          </h4>
                          <p className="text-xs text-slate-500 mt-2">
                            Get a ride in under 2 minutes, guaranteed. Explore
                            our premium safety features.
                          </p>
                        </div>
                        <Link
                          to="/explore"
                          className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all mt-4"
                        >
                          View All Services <ArrowRight size={14} />
                        </Link>
                      </div>
                      <div className="grid gap-1">
                        {serviceMegaMenu.map((item) => (
                          <NavigationMenuLink asChild key={item.title}>
                            <Link
                              to={item.href}
                              className="p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg cursor-pointer transition-all border border-transparent flex items-center gap-3 group"
                            >
                              <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                {item.icon}
                              </div>
                              <div>
                                <p className="text-sm font-bold">
                                  {item.title}
                                </p>
                                <p className="text-[10px] text-slate-500 leading-none">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* 3. Action Buttons */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            <div className="hidden sm:block">
              {data?.data?.email ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full border-2 border-indigo-100 dark:border-slate-800 gap-2 hover:bg-indigo-50 dark:hover:bg-slate-900"
                    >
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white">
                        {data.data.name?.charAt(0)}
                      </div>
                      <span className="font-bold text-xs">
                        {data.data.name}
                      </span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-52 p-2 rounded-xl mt-2"
                  >
                    <DropdownMenuItem asChild className="rounded-lg">
                      <Link
                        to={`/${data.data.role.toLowerCase()}`}
                        className="flex items-center gap-2 py-2 cursor-pointer"
                      >
                        <Zap size={16} /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-lg text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-900/10 cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    className="rounded-full font-bold"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="rounded-full bg-indigo-700 text-white hover:bg-indigo-600 shadow-md font-bold px-6"
                  >
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Overlay Menu */}
      {/* 4. Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b p-6 lg:hidden flex flex-col gap-4 shadow-2xl overflow-hidden"
          >
            {/* ইউজার লগইন থাকলে প্রোফাইল সেকশন দেখাবে */}
            {data?.data?.email && (
              <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-slate-900 rounded-2xl mb-2">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-lg text-white font-bold">
                  {data.data.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-slate-900 dark:text-white leading-none">
                    {data.data.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {data.data.role}
                  </p>
                </div>
              </div>
            )}

            {/* জেনারেল লিঙ্কসমূহ */}
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold hover:text-indigo-600 transition-colors flex items-center gap-3 px-2"
              >
                <Info size={18} className="text-slate-400" /> {link.label}
              </Link>
            ))}

            {/* ড্যাশবোর্ড লিঙ্ক (লগইন থাকলে) */}
            {data?.data?.email && (
              <Link
                to={`/${data.data.role.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-indigo-600 flex items-center gap-3 px-2"
              >
                <Zap size={18} /> Dashboard
              </Link>
            )}

            {/* মোবাইল মেনুতে সার্ভিস সেকশন */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Our Services
              </p>
              <div className="grid gap-4">
                {serviceMegaMenu.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors"
                  >
                    {item.icon}
                    <span className="font-bold">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* লগইন/রেজিস্টার অথবা লগআউট বাটন লজিক */}
            {!data?.data?.email ? (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-xl bg-indigo-400 text-white font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                variant="destructive"
                className="rounded-xl font-bold w-full flex items-center gap-2"
              >
                <X size={18} /> Logout
              </Button>
            )}

            <Button
              variant="ghost"
              className="justify-start gap-3 font-bold text-slate-500"
            >
              <Phone size={18} /> Support Center
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
