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
            <div className="layout-picker-label">Suggested Layouts</div>
            {suggestions.map(({ id, label, renderConfig }) => (
                <button
                    key={id}
                    className="layout-option group"
                    onClick={() => onLayoutSelect(id)}
                >
                    <div className="layout-option-preview">
                        {/* Visual representation using mini-grid */}
                        <div className={`layout-mini-grid type-${renderConfig.type}`}>
                            {renderConfig.showImage && <div className="mini-image" />}
                            <div className="mini-content">
                                {/* Simulate actual title length */}
                                <div className="mini-title-line" />
                                {/* Simulate actual content lines */}
                                {activeSlide?.content.length > 0 ? (
                                    activeSlide.content.slice(0, 3).map((_, i) => (
                                        <div key={i} className="mini-content-line" />
                                    ))
                                ) : (
                                    renderConfig.lines.map((width, i) => (
                                        <div key={i} className="mini-content-line" style={{ width: `${width}%` }} />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Hover overlay */}
                        <div className="layout-hover-overlay" />
                    </div>
                    <span className="layout-option-label">{label}</span>
                </button>
            ))}

            <div className="layout-picker-divider">
                <button className="layout-picker-ai">
                    <Wand2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default LayoutPicker;
