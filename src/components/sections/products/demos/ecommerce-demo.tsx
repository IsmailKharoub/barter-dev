"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useReducedEffects } from "@/lib/hooks";

export function EcommerceDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const reducedEffects = useReducedEffects();

  useEffect(() => {
    if (!isInView || reducedEffects) return;
    
    const phases = [
      { delay: 0 },      // 0: Store appears
      { delay: 400 },    // 1: Header animates
      { delay: 800 },    // 2-7: Products fall in (6 products)
      { delay: 1000 },
      { delay: 1200 },
      { delay: 1400 },
      { delay: 1600 },
      { delay: 1800 },   // 7
      { delay: 2400 },   // 8: Product selected
      { delay: 3000 },   // 9: Add to cart
      { delay: 3600 },   // 10: Cart updates
      { delay: 4200 },   // 11: Checkout view
      { delay: 5000 },   // 12: Payment success
      { delay: 5800 },   // 13: Confetti!
    ];

    const timers: number[] = [];
    phases.forEach((p, i) => {
      timers.push(window.setTimeout(() => {
        setPhase(i);
        if (i === 8) setSelectedProduct(2);
        if (i === 10) setCartCount(1);
        if (i === 11) setSelectedProduct(null);
      }, p.delay));
    });
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isInView, reducedEffects]);

  const showCheckout = phase >= 11;

  if (reducedEffects) {
    return (
      <div ref={containerRef} className="w-full h-full p-4 md:p-6 relative">
        <div className="w-full h-full bg-[#fafafa] rounded-lg border border-neutral-200 overflow-hidden shadow-2xl relative">
          <div className="h-10 bg-white border-b border-neutral-100 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-white border border-neutral-200" />
              <div className="h-2 w-12 bg-neutral-300 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-8 bg-neutral-200 rounded" />
              <div className="w-5 h-5 rounded bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                <span className="text-[8px] text-neutral-600">0</span>
              </div>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-neutral-200 bg-white p-3">
                <div className="h-16 rounded bg-neutral-100 mb-2" />
                <div className="h-2 w-3/4 bg-neutral-200 rounded" />
                <div className="h-2 w-1/3 bg-neutral-200 rounded mt-1.5" />
                <div className="h-6 w-20 bg-black/5 rounded mt-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full p-4 md:p-6 relative">
      <motion.div
        className="w-full h-full bg-[#fafafa] rounded-lg border border-neutral-200 overflow-hidden shadow-2xl relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!showCheckout ? (
            <StoreView 
              key="store" 
              phase={phase} 
              cartCount={cartCount}
              selectedProduct={selectedProduct}
            />
          ) : (
            <CheckoutView key="checkout" phase={phase} />
          )}
        </AnimatePresence>

        {/* Confetti */}
        {phase >= 13 && <Confetti />}
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 -z-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white/10 rounded-full" />
      </motion.div>
    </div>
  );
}

function StoreView({ 
  phase, 
  cartCount, 
  selectedProduct 
}: { 
  phase: number; 
  cartCount: number;
  selectedProduct: number | null;
}) {
  const products = [
    { name: "Wireless Headphones", price: "$149", color: "from-white/30 to-white/10" },
    { name: "Smart Watch", price: "$299", color: "from-gray-300/30 to-gray-500/10" },
    { name: "Camera Lens", price: "$449", color: "from-white/40 to-white/20" },
    { name: "Keyboard", price: "$179", color: "from-gray-400/30 to-gray-600/10" },
    { name: "Speaker", price: "$89", color: "from-white/20 to-white/5" },
    { name: "Microphone", price: "$199", color: "from-gray-200/30 to-gray-400/10" },
  ];

  return (
    <motion.div
      className="absolute inset-0 bg-[#fafafa] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div
        className="h-10 bg-white border-b border-neutral-100 px-4 flex items-center justify-between"
        initial={{ y: -40, opacity: 0 }}
        animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-white" />
          <div className="h-2 w-12 bg-neutral-300 rounded" />
        </div>

        {/* Nav */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-2">
            {["Shop", "New", "Sale"].map((_, i) => (
              <div key={i} className="h-1.5 w-6 bg-neutral-200 rounded" />
            ))}
          </div>
          
          {/* Cart */}
          <motion.div 
            className="relative w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center"
            animate={phase >= 10 ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-3 h-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <span className="text-[6px] text-black font-bold">{cartCount}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Products grid */}
      <div className="flex-1 p-3 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 h-full">
          {products.map((product, i) => {
            const isSelected = selectedProduct === i;
            const showProduct = phase >= 2 + i;
            
            return (
              <motion.div
                key={i}
                className={`relative bg-white rounded-lg border overflow-hidden cursor-pointer transition-all ${
                  isSelected ? "border-neutral-400 ring-2 ring-neutral-200" : "border-neutral-100"
                }`}
                initial={{ opacity: 0, y: -100, rotateX: -20 }}
                animate={showProduct ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  scale: isSelected ? 1.02 : 1,
                } : {}}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: i * 0.05
                }}
              >
                {/* Product image */}
                <div className={`h-2/3 bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="w-1/2 h-1/2 bg-white/30 rounded-full" />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                    initial={{ x: "-200%" }}
                    animate={showProduct ? { x: "200%" } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  />
                </div>

                {/* Product info */}
                <div className="p-1.5">
                  <div className="h-1 w-full bg-neutral-200 rounded mb-1" />
                  <div className="text-[8px] font-bold text-neutral-800">{product.price}</div>
                </div>

                {/* Add to cart overlay */}
                {isSelected && phase >= 9 && (
                                <motion.div
                                    className="absolute inset-0 bg-neutral-800/90 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function CheckoutView({ phase }: { phase: number }) {
  return (
    <motion.div
      className="absolute inset-0 bg-white flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="h-10 border-b border-neutral-100 px-4 flex items-center">
        <div className="text-[10px] font-medium text-neutral-800">Checkout</div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Order summary */}
        <motion.div
          className="bg-neutral-50 rounded-lg p-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-400 to-orange-500" />
            <div className="flex-1">
              <div className="h-1.5 w-16 bg-neutral-300 rounded" />
              <div className="text-[9px] font-bold text-neutral-800 mt-1">$449.00</div>
            </div>
          </div>
          <div className="flex justify-between text-[8px]">
            <span className="text-neutral-500">Shipping</span>
            <span className="text-neutral-800">Free</span>
          </div>
          <div className="h-px bg-neutral-200 my-2" />
          <div className="flex justify-between text-[9px] font-bold">
            <span className="text-neutral-800">Total</span>
            <span className="text-violet-600">$449.00</span>
          </div>
        </motion.div>

        {/* Payment */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-[8px] text-neutral-500">Payment</div>
          <div className="flex gap-2">
            {["💳", "🏦", "📱"].map((icon, i) => (
              <motion.div
                key={i}
                className={`flex-1 h-8 rounded border flex items-center justify-center ${
                  i === 0 ? "border-neutral-400 bg-neutral-100" : "border-neutral-200"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className="text-sm">{icon}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pay button */}
        <motion.div
          className="mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
            <motion.div
              className="h-10 bg-neutral-900 rounded-lg flex items-center justify-center relative overflow-hidden"
            animate={phase >= 12 ? { scale: [1, 0.98, 1] } : {}}
          >
            {phase < 12 ? (
              <span className="text-[10px] font-medium text-white">Pay $449.00</span>
            ) : (
              <motion.div
                className="flex items-center gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[10px] font-medium text-white">Payment Complete!</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Confetti() {
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 2,
    color: ["#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333"][Math.floor(Math.random() * 5)],
    size: 4 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ 
            y: "100%", 
            opacity: 0,
            rotate: 360 + Math.random() * 360,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

