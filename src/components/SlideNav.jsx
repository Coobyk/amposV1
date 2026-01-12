import React from 'react';
import { Plus, LayoutGrid, Layers } from 'lucide-react';

const SlideNav = ({ slides, activeSlide, onSelectSlide, onAddSlide }) => {
    return (
        <div className="h-24 flex items-center px-8 border-b border-white/5 glass-panel z-10 overflow-x-auto no-scrollbar gap-4">
            <div className="grid grid-flow-col auto-cols-max gap-4 py-2">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => onSelectSlide(index)}
                        className={`
              w-32 h-16 rounded-lg overflow-hidden transition-all duration-300 relative group
              ${activeSlide === index ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-zinc-950 scale-105' : 'opacity-60 hover:opacity-100'}
            `}
                    >
                        <div className="w-full h-full bg-zinc-800 flex flex-col p-2 text-[8px] items-start justify-center">
                            <div className="w-8 h-1 bg-zinc-600 mb-1 rounded-full opacity-50" />
                            <div className="w-12 h-1 bg-zinc-600 mb-1 rounded-full opacity-30" />
                            <div className="absolute bottom-1 right-2 text-zinc-500 text-[6px]">{index + 1}</div>
                            {activeSlide === index && <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none" />}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 py-0.5 bg-black/40 text-[8px] font-medium text-center truncate px-1">
                            {slide.title}
                        </div>
                    </button>
                ))}

                <button
                    onClick={onAddSlide}
                    className="w-32 h-16 rounded-lg border-2 border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center justify-center transition-all group"
                >
                    <Plus className="text-zinc-500 group-hover:text-white transition-colors" size={24} />
                </button>
            </div>

            <div className="ml-auto flex items-center gap-4 border-l border-white/10 pl-6 h-10">
                <button className="text-zinc-400 hover:text-white transition-colors"><LayoutGrid size={20} /></button>
                <button className="text-zinc-400 hover:text-white transition-colors"><Layers size={20} /></button>
            </div>
        </div>
    );
};

export default SlideNav;
