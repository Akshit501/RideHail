import { RegisterForm } from "@/components/modules/authentication/RegistrationForm";
import { ChevronLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* --- Left Side: Visual Focus (Flipped for variety) --- */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200"
          alt="Register Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center p-16 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h2 className="text-5xl font-black leading-tight">
              Join the <br /> Movement.
            </h2>
            <p className="text-lg text-indigo-100 max-w-md">
              Create an account today and experience the future of urban
              mobility. Whether you want to ride or drive, we've got you
              covered.
            </p>

            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="bg-white/10 p-2 rounded-xl text-indigo-300 font-bold">
                  01
                </div>
                <p className="font-medium">Setup your profile in seconds.</p>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="bg-white/10 p-2 rounded-xl text-indigo-300 font-bold">
                  02
                </div>
                <p className="font-medium">
                  Verify your identity for a safe ride.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="bg-white/10 p-2 rounded-xl text-indigo-300 font-bold">
                  03
                </div>
                <p className="font-medium">Book your first trip and enjoy!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- Right Side: Form --- */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col p-6 md:p-10"
      >
        <div className="flex justify-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Create Account
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Fill in your details to start your journey with Ride Hail.
              </p>
            </div>

            {/* The Actual Registration Form */}
            <RegisterForm />

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Info className="text-indigo-600 shrink-0" size={18} />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                By creating an account, you agree to our Terms of Service and
                Privacy Policy. We'll send you a verification link to your
                email.
              </p>
            </div>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:underline underline-offset-4"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
