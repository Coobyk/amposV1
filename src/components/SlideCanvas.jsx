import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SlideCanvas = ({ slide }) => {
    if (!slide) return null;

    return (
        <div className="flex-1 relative overflow-hidden bg-white text-zinc-950 flex p-20 shadow-inner">
            {/* Background Gradient Detail (from wireframe) */}
            <div className="absolute -bottom-20 -right-20 w-[40rem] h-[30rem] bg-indigo-100 blur-[100px] opacity-60 rounded-full" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative z-10 w-full flex items-start justify-between gap-12"
                >
                    {/* Left Column: Image Area */}
                    <div className="w-[35%] aspect-[3/4] glass-card shadow-xl overflow-hidden relative flex flex-col items-center justify-center border-zinc-200">
                        <div className="text-zinc-300 font-medium">Some Image</div>
                        <div className="absolute bottom-4 text-[10px] text-zinc-400">https://image source</div>
                        {/* Mock image shape (curvy line from wireframe) */}
                        <svg className="absolute inset-0 w-full h-full stroke-zinc-100 fill-none opacity-20" viewBox="0 0 100 100">
                            <path d="M20,80 C40,40 60,110 80,20" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Right Column: Text Area */}
                    <div className="flex-1 pt-12">
                        <h1 className="text-7xl font-extrabold mb-8 tracking-tighter text-zinc-900 group">
                            {slide.title}
                            <span className="block h-1 w-20 bg-indigo-500 mt-2 rounded-full" />
                        </h1>

                        <p className="text-zinc-400 text-sm italic mb-12">(Simple sans-serif font with slight noise effect)</p>

                        <ul className="space-y-6">
                            {slide.content.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex items-center gap-4 text-2xl font-medium text-zinc-700 hover:text-indigo-600 transition-colors cursor-default"
                                >
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full" />
                                    {item}
                                </motion.li>
                            ))}
                            {slide.content.length === 0 && (
                                <li className="text-zinc-300 italic text-xl">Start writing your presentation...</li>
                            )}
                        </ul>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SlideCanvas;
