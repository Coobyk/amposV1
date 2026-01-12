import React from 'react';
import { Sun, Moon, Type, Check } from 'lucide-react';

const fonts = [
    { id: 'minimal', label: 'Minimal', family: "'Inter', sans-serif", heading: "'Outfit', sans-serif" },
    { id: 'classic', label: 'Classic', family: "'Times New Roman', serif", heading: "'Times New Roman', serif" },
    { id: 'bold', label: 'Bold', family: "'Arial', sans-serif", heading: "'Arial Black', sans-serif" }
];

const colors = [
    '#6366f1', // Indigo (Default)
    '#ec4899', // Pink
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#8b5cf6', // Violet
    '#18181b', // Zinc (Black/White)
];

const StylePanel = ({ theme, onThemeChange }) => {
    return (
        <div className="style-panel bg-zinc-900/90 backdrop-blur-xl border-l border-white/10 w-80 h-full p-6 flex flex-col gap-8 absolute right-0 top-0 z-[100] animate-in slide-in-from-right duration-300 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">Style & Theme</h2>

            {/* Mode Toggle */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Appearance</label>
                <div className="flex bg-zinc-900/50 p-1 rounded-lg">
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all ${theme.mode === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                        onClick={() => onThemeChange({ ...theme, mode: 'dark' })}
                    >
                        <Moon size={16} />
                        <span className="text-sm font-medium">Dark</span>
                    </button>
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all ${theme.mode === 'light' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                        onClick={() => onThemeChange({ ...theme, mode: 'light' })}
                    >
                        <Sun size={16} />
                        <span className="text-sm font-medium">Light</span>
                    </button>
                </div>
            </div>

            {/* Font Selector */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Typography</label>
                <div className="grid gap-2">
                    {fonts.map((font) => (
                        <button
                            key={font.id}
                            onClick={() => onThemeChange({ ...theme, font: font.id })}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${theme.font === font.id ? 'bg-indigo-500/20 border-indigo-500/50 text-white' : 'bg-zinc-800/50 border-transparent text-zinc-400 hover:bg-zinc-800'}`}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-bold" style={{ fontFamily: font.heading }}>{font.label}</span>
                                <span className="text-xs opacity-60" style={{ fontFamily: font.family }}>The quick brown fox</span>
                            </div>
                            {theme.font === font.id && <Check size={16} className="text-indigo-400" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Picker */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Accent Color</label>
                <div className="grid grid-cols-4 gap-3">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => onThemeChange({ ...theme, accent: color })}
                            className={`w-full aspect-square rounded-full border-2 transition-all ${theme.accent === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}

                    {/* Custom Color Input Wrapper */}
                    <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-zinc-700 flex items-center justify-center bg-zinc-800 group hover:border-zinc-500 transition-colors">
                        <input
                            type="color"
                            value={theme.accent}
                            onChange={(e) => onThemeChange({ ...theme, accent: e.target.value })}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <Palette size={16} className="text-zinc-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StylePanel;
