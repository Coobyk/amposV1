import React from 'react';
import { Type, Image, Sparkles, Palette, Settings, MoreHorizontal } from 'lucide-react';

const icons = [
    { icon: Type, label: 'Text' },
    { icon: Image, label: 'Image' },
    { icon: Sparkles, label: 'AI' },
    { icon: Palette, label: 'Style' },
];

const Sidebar = () => {
    return (
        <div className="w-20 flex flex-col items-center py-8 border-r border-white/10 glass-panel z-10">
            <div className="mb-12">
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-indigo-500/20">
                    A
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-8">
                {icons.map(({ icon: Icon, label }) => (
                    <button
                        key={label}
                        className="group flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors"
                    >
                        <div className="p-3 rounded-2xl group-hover:bg-white/5 transition-all outline-none">
                            <Icon size={24} />
                        </div>
                        <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-6 text-zinc-500">
                <button className="hover:text-white transition-colors p-2"><Settings size={20} /></button>
                <button className="hover:text-white transition-colors p-2"><MoreHorizontal size={20} /></button>
            </div>
        </div>
    );
};

export default Sidebar;
