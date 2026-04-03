/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useRequestRideMutation } from "@/redux/features/rider/rider.api";
import { loadStripe } from "@stripe/stripe-js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  MapPin,
  CircleDot,
  CreditCard,
  Banknote,
  ArrowRight,
  ChevronLeft,
  Loader2,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

const calculateFare = (pickup: string, dropoff: string): number => {
  const baseFare = 50;
  const distanceRate = 15;
  const distance = Math.abs(pickup.length - dropoff.length) || 5;
  return baseFare + distance * distanceRate;
};

const elementOptions = {
  style: {
    base: {
      fontSize: "18px",
      color: "#1e293b",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#94a3b8" },
    },
    invalid: { color: "#ef4444" },
  },
};

const PaymentForm = ({ fare, onSuccess, onBack }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    try {
      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) throw new Error("Card element not found");

      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8" // Increased spacing for desktop
    >
      <button
        onClick={onBack}
        className="flex items-center text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
      >
        <ChevronLeft size={16} className="mr-1" /> Back to Ride Details
      </button>

      <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-2">
            Secure Checkout
          </p>
          <h3 className="text-6xl font-black italic tracking-tighter">
            ${fare.toFixed(2)}
          </h3>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 ml-2 uppercase tracking-wide">
            Card Number
          </label>
          <div className="p-5 border-2 border-slate-100 rounded-2xl bg-slate-50 focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-50 transition-all shadow-sm">
            <CardNumberElement options={elementOptions} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 ml-2 uppercase tracking-wide">
              Expiry Date
            </label>
            <div className="p-5 border-2 border-slate-100 rounded-2xl bg-slate-50 focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-50 transition-all shadow-sm">
              <CardExpiryElement options={elementOptions} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 ml-2 uppercase tracking-wide">
              CVC
            </label>
            <div className="p-5 border-2 border-slate-100 rounded-2xl bg-slate-50 focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-50 transition-all shadow-sm">
              <CardCvcElement options={elementOptions} />
            </div>
          </div>
        </div>

        <Button
          disabled={!stripe || isProcessing}
          className="w-full h-20 rounded-[2rem] text-2xl font-black uppercase shadow-2xl shadow-indigo-200 transition-all active:scale-95 bg-indigo-600 hover:bg-indigo-700 mt-4"
        >
          {isProcessing ? (
            <Loader2 className="animate-spin" />
          ) : (
            `Confirm Payment`
          )}
        </Button>
      </form>
    </motion.div>
  );
};

const RequestRide = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [fare, setFare] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"card" | "cash">("card");
  const [pickupPoint, setPickupPoint] = useState<L.LatLngLiteral | null>(null);
  const [dropoffPoint, setDropoffPoint] = useState<L.LatLngLiteral | null>(null);
  const mapContainerId = "ride-map";
  const mapRef = React.useRef<L.Map | null>(null);
  const pickupMarkerRef = React.useRef<L.Marker | null>(null);
  const dropoffMarkerRef = React.useRef<L.Marker | null>(null);
  const lineRef = React.useRef<L.Polyline | null>(null);
  const [requestRide, { isLoading }] = useRequestRideMutation();

  const formatCoords = (point: L.LatLngLiteral) =>
    `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`;

  const markerIcon = (label: string, color: string) =>
    L.divIcon({
      html: `<div style="width:24px;height:24px;border-radius:999px;background:${color};color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;box-shadow:0 4px 10px rgba(0,0,0,0.25)">${label}</div>`,
      className: "",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

  useEffect(() => {
    if (pickup && dropoff) setFare(calculateFare(pickup, dropoff));
    else setFare(null);
  }, [pickup, dropoff]);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map(mapContainerId, {
      zoomControl: true,
      attributionControl: true,
    }).setView([23.8103, 90.4125], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    map.on("click", (e: L.LeafletMouseEvent) => {
      const point = { lat: e.latlng.lat, lng: e.latlng.lng };

      if (!pickupPoint || (pickupPoint && dropoffPoint)) {
        setPickupPoint(point);
        setDropoffPoint(null);
        setPickup(formatCoords(point));
        setDropoff("");
        return;
      }

      setDropoffPoint(point);
      setDropoff(formatCoords(point));
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [pickupPoint, dropoffPoint]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
      pickupMarkerRef.current = null;
    }
    if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.remove();
      dropoffMarkerRef.current = null;
    }
    if (lineRef.current) {
      lineRef.current.remove();
      lineRef.current = null;
    }

    if (pickupPoint) {
      pickupMarkerRef.current = L.marker(pickupPoint, {
        icon: markerIcon("P", "#4f46e5"),
      })
        .addTo(mapRef.current)
        .bindPopup("Pickup point");
    }

    if (dropoffPoint) {
      dropoffMarkerRef.current = L.marker(dropoffPoint, {
        icon: markerIcon("D", "#e11d48"),
      })
        .addTo(mapRef.current)
        .bindPopup("Dropoff point");
    }

    if (pickupPoint && dropoffPoint) {
      lineRef.current = L.polyline([pickupPoint, dropoffPoint], {
        color: "#6366f1",
        weight: 4,
      }).addTo(mapRef.current);

      mapRef.current.fitBounds(
        L.latLngBounds([
          [pickupPoint.lat, pickupPoint.lng],
          [dropoffPoint.lat, dropoffPoint.lng],
        ]),
        { padding: [30, 30] }
      );
    } else if (pickupPoint) {
      mapRef.current.setView([pickupPoint.lat, pickupPoint.lng], 14);
    }
  }, [pickupPoint, dropoffPoint]);

  const useCurrentLocationAsPickup = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const point = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setPickupPoint(point);
        setPickup(formatCoords(point));
        if (mapRef.current) {
          mapRef.current.setView([point.lat, point.lng], 14);
        }
      },
      () => {
        toast.error("Unable to access your location");
      }
    );
  };

  const handleRequest = async () => {
    if (!fare) return;
    if (selectedMethod === "card") {
      setShowPayment(true);
      return;
    }
    try {
      await requestRide({
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        fare,
      }).unwrap();
      toast.success("Searching for nearby drivers!");
      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.message || "Request failed");
    }
  };

  const resetForm = () => {
    setPickup("");
    setDropoff("");
    setFare(null);
    setShowPayment(false);
    setPickupPoint(null);
    setDropoffPoint(null);
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
      {/* Container width increased for desktop */}
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-[#4F39F6] mb-2"
          >
            {showPayment ? "Secure Payment" : "Book Your Ride"}
          </motion.h2>
          <p className="text-slate-500 text-base font-medium italic">
            {showPayment
              ? "Finish your transaction to confirm ride"
              : "Safe, fast, and reliable transport"}
          </p>
        </div>

        <div className=" rounded-[3rem] border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] p-8 md:p-12 transition-all">
          {!showPayment ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="relative space-y-6 before:absolute before:left-[23px] before:top-12 before:bottom-12 before:w-1 before:bg-slate-50">
                <div className="relative flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 z-10">
                    <CircleDot size={24} className="text-indigo-600" />
                  </div>
                  <Input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pickup Location"
                    className="h-16 rounded-2xl bg-slate-50 border-none font-bold text-lg px-6 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all"
                  />
                </div>
                <div className="relative flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0 z-10">
                    <MapPin size={24} className="text-rose-500" />
                  </div>
                  <Input
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Destination Location"
                    className="h-16 rounded-2xl bg-slate-50 border-none font-bold text-lg px-6 focus:bg-white focus:ring-4 focus:ring-rose-50 transition-all"
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-100 p-4 bg-slate-50/60">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    Map Picker
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={useCurrentLocationAsPickup}
                      className="px-3 py-2 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                    >
                      Use My Location
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPickupPoint(null);
                        setDropoffPoint(null);
                        setPickup("");
                        setDropoff("");
                      }}
                      className="px-3 py-2 text-xs font-bold rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100"
                    >
                      Clear Pins
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-3">
                  Click once to set pickup, click again to set dropoff.
                </p>
                <div id={mapContainerId} className="h-72 w-full rounded-2xl overflow-hidden" />
              </div>

              {fare !== null && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-8 bg-indigo-600 rounded-[2rem] flex justify-between items-center text-white shadow-xl shadow-indigo-200"
                >
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-white/20 rounded-2xl">
                      <Car size={32} />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-black tracking-widest opacity-80">
                        Estimated Fare
                      </p>
                      <p className="text-4xl font-black italic">
                        ${fare.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setSelectedMethod("card")}
                  className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
                    selectedMethod === "card"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-inner"
                      : "border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <CreditCard size={28} />
                  <span className="text-sm font-black uppercase tracking-wider">
                    Credit Card
                  </span>
                </button>
                <button
                  onClick={() => setSelectedMethod("cash")}
                  className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
                    selectedMethod === "cash"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-inner"
                      : "border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <Banknote size={28} />
                  <span className="text-sm font-black uppercase tracking-wider">
                    Cash Pay
                  </span>
                </button>
              </div>

              <Button
                onClick={handleRequest}
                disabled={isLoading || !pickup || !dropoff}
                className="w-full h-20 rounded-[2rem] text-xl font-black uppercase shadow-2xl hover:translate-y-[-2px] active:translate-y-[0] transition-all"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    {selectedMethod === "card"
                      ? "Proceed to Checkout"
                      : "Confirm Ride Request"}
                    <ArrowRight size={24} className="ml-3" />
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm
                fare={fare!}
                onSuccess={async () => {
                  await requestRide({
                    pickupLocation: pickup,
                    dropoffLocation: dropoff,
                    fare: fare!,
                  }).unwrap();
                  toast.success("Finding driver...");
                  resetForm();
                }}
                onBack={() => setShowPayment(false)}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestRide;
