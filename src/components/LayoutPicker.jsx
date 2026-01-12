import React from 'react';
import { Wand2 } from 'lucide-react';

const allLayouts = [
    // Text Focused Layouts
    {
        id: 'centered',
        label: 'Centered Hero',
        type: 'text-only',
        renderConfig: { type: 'centered', lines: [80, 50], showImage: false }
    },
    {
        id: 'left-align',
        label: 'Left Aligned',
        type: 'text-only',
        renderConfig: { type: 'list', lines: [60, 60, 60], showImage: false }
    },

    // Mixed Content Layouts
    {
        id: 'split',
        label: 'Split Left', // Image Left
        type: 'mixed',
        renderConfig: { type: 'split', lines: [70, 40], showImage: true }
    },
    {
        id: 'split-right',
        label: 'Split Right', // Image Right
        type: 'mixed',
        renderConfig: { type: 'split-right', lines: [50, 60, 40], showImage: true }
    },

    // Image Focused Layouts
    {
        id: 'full-image',
        label: 'Full Background',
        type: 'image-heavy',
        renderConfig: { type: 'full', lines: [], showImage: true }
    },
];

const getSuggestions = (slide) => {
    // Simple logic: if image is present (conceptual check), prioritize mixed/image layouts.
    // If text only, prioritize text layouts.

    // For now, since we don't have actual image upload state working perfectly yet, 
    // we'll show meaningful subsets.

    if (slide.image) {
        return allLayouts.filter(l => l.type === 'mixed' || l.type === 'image-heavy');
    }

    if (slide.content.length > 3) {
        return allLayouts.filter(l => l.id === 'left-align' || l.id === 'split-right');
    }

    // Default Mix
    return allLayouts;
};


const LayoutPicker = ({ activeSlide, onLayoutSelect }) => {
    const suggestions = getSuggestions(activeSlide || { content: [] });

    return (
        <div className="layout-picker">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mr-4">Suggested Layouts</div>
            {suggestions.map(({ id, label, renderConfig }) => (
                <button
                    key={id}
                    className="layout-option group"
                    onClick={() => onLayoutSelect(id)}
                >
                    <div className="layout-option-preview relative overflow-hidden">
                        {/* Visual representation using mini-grid */}
                        <div className={`layout-mini-grid type-${renderConfig.type}`}>
                            {renderConfig.showImage && <div className="mini-image bg-indigo-500/20 rounded-sm" />}
                            <div className="mini-content flex flex-col gap-1.5 flex-1 p-2">
                                {/* Simulate actual title length */}
                                <div className="h-1.5 bg-zinc-600 rounded-full w-3/4 mb-1" />
                                {/* Simulate actual content lines */}
                                {activeSlide?.content.length > 0 ? (
                                    activeSlide.content.slice(0, 3).map((_, i) => (
                                        <div key={i} className="h-1 bg-zinc-700/50 rounded-full w-full" />
                                    ))
                                ) : (
                                    renderConfig.lines.map((width, i) => (
                                        <div key={i} className="h-1 bg-zinc-700/50 rounded-full" style={{ width: `${width}%` }} />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="layout-option-label">{label}</span>
                </button>
            ))}

            <div className="ml-auto pl-4 border-l border-white/10">
                <button className="layout-picker-ai">
                    <Wand2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default LayoutPicker;
