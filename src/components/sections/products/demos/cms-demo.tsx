"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function CmsDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0);
  const [contentBlocks, setContentBlocks] = useState<string[]>([]);

  useEffect(() => {
    if (!isInView) return;
    
    const phases = [
      { delay: 0 },      // 0: Editor appears
      { delay: 500 },    // 1: Sidebar appears
      { delay: 1000 },   // 2: First block dragged
      { delay: 1800 },   // 3: Second block dragged
      { delay: 2600 },   // 4: Third block dragged
      { delay: 3400 },   // 5: Text starts typing in blocks
      { delay: 4400 },   // 6: Preview syncs
      { delay: 5200 },   // 7: Publish button appears
      { delay: 5800 },   // 8: Publish animation
      { delay: 6400 },   // 9: Distribution animation
    ];

    phases.forEach((p, i) => {
      setTimeout(() => {
        setPhase(i);
        if (i === 2) setContentBlocks(["heading"]);
        if (i === 3) setContentBlocks(["heading", "text"]);
        if (i === 4) setContentBlocks(["heading", "text", "image"]);
      }, p.delay);
    });
  }, [isInView]);

  return (
    <div ref={containerRef} className="w-full h-full p-4 md:p-6 relative">
      <motion.div
        className="w-full h-full bg-[#1a1a2e] rounded-lg border border-indigo-500/20 overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Editor header */}
        <motion.div
          className="h-8 bg-[#16162a] border-b border-indigo-500/10 px-3 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-indigo-400 to-purple-500" />
            <div className="h-1.5 w-14 bg-white/20 rounded" />
          </div>
          
          {/* Publish button */}
          <motion.div
            className={`px-2 py-1 rounded text-[8px] font-medium transition-colors ${
              phase >= 7 
                ? phase >= 8 
                  ? "bg-green-500 text-white" 
                  : "bg-indigo-500 text-white"
                : "bg-white/10 text-white/50"
            }`}
            animate={phase === 8 ? { scale: [1, 0.95, 1] } : {}}
          >
            {phase >= 8 ? "✓ Published" : "Publish"}
          </motion.div>
        </motion.div>

        <div className="flex h-[calc(100%-2rem)]">
          {/* Block sidebar */}
          <motion.div
            className="w-14 bg-[#12122a] border-r border-indigo-500/10 p-2 space-y-2"
            initial={{ x: -60, opacity: 0 }}
            animate={phase >= 1 ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="text-[6px] text-white/30 text-center mb-2">BLOCKS</div>
            {[
              { icon: "H", label: "Heading", color: "indigo" },
              { icon: "¶", label: "Text", color: "purple" },
              { icon: "▢", label: "Image", color: "pink" },
              { icon: "◐", label: "Button", color: "amber" },
            ].map((block, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <div className={`w-full aspect-square rounded bg-${block.color}-500/20 border border-${block.color}-500/30 flex items-center justify-center cursor-grab hover:bg-${block.color}-500/30 transition-colors`}>
                  <span className="text-[10px] text-white/70 font-bold">{block.icon}</span>
                </div>
                
                {/* Drag indicator for animation */}
                {((phase === 2 && i === 0) || (phase === 3 && i === 1) || (phase === 4 && i === 2)) && (
                  <DragIndicator />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Editor canvas */}
          <div className="flex-1 flex">
            {/* Content editor */}
            <div className="flex-1 p-3 bg-[#0f0f1f]">
              <div className="text-[7px] text-white/30 mb-2">EDITOR</div>
              
              <div className="space-y-2 min-h-[60%]">
                {contentBlocks.map((blockType, i) => (
                  <ContentBlock 
                    key={i} 
                    type={blockType} 
                    phase={phase} 
                    index={i}
                  />
                ))}
                
                {/* Empty state placeholder */}
                {contentBlocks.length === 0 && (
                  <motion.div
                    className="h-16 border-2 border-dashed border-indigo-500/20 rounded-lg flex items-center justify-center"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-[8px] text-indigo-400/50">Drag blocks here</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Live preview */}
            <motion.div
              className="w-1/2 bg-[#0a0a14] border-l border-indigo-500/10 p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[7px] text-white/30">PREVIEW</div>
                {phase >= 6 && (
                  <motion.div
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[6px] text-green-400">Live</span>
                  </motion.div>
                )}
              </div>
              
              {/* Preview content */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="h-4 bg-neutral-100 flex items-center gap-1 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
                
                <div className="p-2 bg-white space-y-2">
                  {contentBlocks.map((blockType, i) => (
                    <PreviewBlock 
                      key={i} 
                      type={blockType} 
                      phase={phase}
                      index={i}
                    />
                  ))}
                  
                  {contentBlocks.length === 0 && (
                    <div className="h-12 flex items-center justify-center">
                      <span className="text-[8px] text-neutral-300">Empty page</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Distribution animation */}
              {phase >= 9 && (
                <motion.div
                  className="mt-3 flex justify-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {["📧", "🐦", "📱"].map((icon, i) => (
                    <motion.div
                      key={i}
                      className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.15, type: "spring" }}
                    >
                      <span className="text-[10px]">{icon}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 -z-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-indigo-500/20 rounded-full" />
      </motion.div>
    </div>
  );
}

function DragIndicator() {
  return (
    <motion.div
      className="absolute inset-0 border-2 border-indigo-400 rounded bg-indigo-400/20"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        x: [0, 0, 40, 40],
        y: [0, 0, 20, 20],
      }}
      transition={{ duration: 0.8 }}
    />
  );
}

function ContentBlock({ type, phase, index }: { type: string; phase: number; index: number }) {
  const showTyping = phase >= 5;
  
  const blockStyles: Record<string, { bg: string; border: string }> = {
    heading: { bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
    text: { bg: "bg-purple-500/10", border: "border-purple-500/30" },
    image: { bg: "bg-pink-500/10", border: "border-pink-500/30" },
  };
  
  const style = blockStyles[type] || blockStyles.heading;

  return (
    <motion.div
      className={`p-2 rounded border ${style.bg} ${style.border}`}
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center gap-1 mb-1">
        <div className="w-1 h-3 bg-indigo-400/50 rounded" />
        <span className="text-[7px] text-white/40 uppercase">{type}</span>
      </div>
      
      {type === "heading" && (
        <div className="text-[9px] text-white/80 font-bold">
          {showTyping ? "Welcome to Our Site" : ""}
          {showTyping && phase === 5 && index === 0 && <Cursor />}
        </div>
      )}
      
      {type === "text" && (
        <div className="text-[7px] text-white/60 leading-relaxed">
          {showTyping && phase >= 5 ? "This is a paragraph of content that appears live as you type in the editor." : ""}
          {showTyping && phase === 5 && index === 1 && <Cursor />}
        </div>
      )}
      
      {type === "image" && (
        <div className="aspect-video bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded flex items-center justify-center">
          <div className="w-4 h-4 border border-white/20 rounded" />
        </div>
      )}
    </motion.div>
  );
}

function PreviewBlock({ type, phase, index }: { type: string; phase: number; index: number }) {
  const showContent = phase >= 6;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showContent ? 1 : 0.3 }}
      transition={{ delay: index * 0.1 }}
    >
      {type === "heading" && (
        <div className="text-[9px] font-bold text-neutral-800">
          {showContent ? "Welcome to Our Site" : "Heading"}
        </div>
      )}
      
      {type === "text" && (
        <div className="text-[6px] text-neutral-500 leading-relaxed">
          {showContent ? "This is a paragraph of content that appears live as you type in the editor." : "Paragraph text..."}
        </div>
      )}
      
      {type === "image" && (
        <div className="aspect-video bg-gradient-to-br from-pink-200 to-purple-200 rounded" />
      )}
    </motion.div>
  );
}

function Cursor() {
  return (
    <motion.span
      className="inline-block w-0.5 h-3 bg-indigo-400 ml-0.5 align-middle"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
  );
}

