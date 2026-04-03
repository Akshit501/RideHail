import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { ChevronLeft, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh pt-20 lg:pt-0 lg:grid-cols-2 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* --- Left Side: Form --- */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col p-6 md:p-10"
      >
        {/* Top Navigation */}
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <div className="bg-gradient-to-br from-indigo-600 to-sky-500 p-1.5 rounded-lg shadow-md">
              <span className="text-white font-bold text-xs">RH</span>
            </div>
            <span className="font-bold">Ride Hail</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Enter your credentials to access your account.
              </p>
            </div>

            {/* The Actual Form */}
            <LoginForm />

            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* --- Right Side: Visuals --- */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1675259008837-3f1d72420ae5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4]"
        />
        {/* Dynamic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/20 to-transparent" />

        {/* Floating Intuitive Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 text-white"
        >
          <div className="flex gap-1 text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="text-xl font-medium leading-relaxed italic">
            "The easiest way to get around the city. Ride Hail has completely
            changed how I commute to work every morning."
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <h4 className="font-bold">Arif Ahmed</h4>
              <p className="text-xs text-indigo-200">Daily Commuter</p>
            </div>
            <div className="ml-auto flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/30">
              <ShieldCheck size={12} /> Verified Ride
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
