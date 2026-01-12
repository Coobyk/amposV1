import React from 'react';
import { Layout, Palette, Wand2 } from 'lucide-react';

const layouts = [
    { id: 'cover', icon: Layout, label: 'Cover' },
    { id: 'toc', icon: Wand2, label: 'TOC' },
    { id: 'intro', icon: Palette, label: 'Intro' },
    { id: 'content', icon: Layout, label: 'Content' },
    { id: 'image', icon: Palette, label: 'Image' },
];

const LayoutPicker = () => {
    return (
        <div className="h-32 border-t border-white/5 bg-black/20 backdrop-blur-md flex items-center px-10 gap-6 overflow-x-auto no-scrollbar">
            {layouts.map(({ id, icon: Icon, label }) => (
                <button
                    key={id}
                    className="flex-shrink-0 group flex flex-col items-center gap-2"
                >
                    <div className="w-40 h-20 rounded-xl bg-zinc-900/50 border border-white/10 group-hover:border-indigo-500/50 group-hover:bg-zinc-800/80 transition-all flex items-center justify-center p-4 relative overflow-hidden">
                        {/* Abstract layout shapes */}
                        <div className="w-1/2 h-full bg-indigo-500/10 rounded-lg mr-2" />
                        <div className="flex-1 space-y-2">
                            <div className="w-full h-1 bg-zinc-700 rounded-full" />
                            <div className="w-2/3 h-1 bg-zinc-700/50 rounded-full" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[10px] uppercase tracking-tighter text-zinc-500 group-hover:text-zinc-300 font-bold">{label}</span>
                </button>
            ))}

            <div className="ml-auto w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 cursor-pointer transition-all">
                <Wand2 size={20} />
            </div>
        </div>
    );
};

export default LayoutPicker;
