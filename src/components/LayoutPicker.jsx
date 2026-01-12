import React from 'react';
import { Wand2 } from 'lucide-react';

const layouts = [
    {
        id: 'cover',
        label: 'Cover',
        renderConfig: { type: 'centered', lines: [80, 50], showImage: false }
    },
    {
        id: 'toc',
        label: 'Table of Contents',
        renderConfig: { type: 'list', lines: [60, 60, 60], showImage: false }
    },
    {
        id: 'intro',
        label: 'Intro',
        renderConfig: { type: 'split', lines: [70, 40], showImage: true }
    },
    {
        id: 'content',
        label: 'Content',
        renderConfig: { type: 'split-right', lines: [50, 60, 40], showImage: true }
    },
    {
        id: 'image',
        label: 'Full Image',
        renderConfig: { type: 'full', lines: [], showImage: true }
    },
];

const LayoutPicker = () => {
    return (
        <div className="layout-picker">
            {layouts.map(({ id, label, renderConfig }) => (
                <button key={id} className="layout-option group">
                    <div className="layout-option-preview relative overflow-hidden">
                        {/* Visual representation of the layout inside the preview box */}
                        <div className={`layout-mini-grid type-${renderConfig.type}`}>
                            {renderConfig.showImage && <div className="mini-image bg-indigo-500/20 rounded-sm" />}
                            <div className="mini-content flex flex-col gap-1.5 flex-1 p-2">
                                {renderConfig.lines.map((width, i) => (
                                    <div key={i} className="h-1 bg-zinc-700/50 rounded-full" style={{ width: `${width}%` }} />
                                ))}
                            </div>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="layout-option-label">{label}</span>
                </button>
            ))}

            <button className="layout-picker-ai">
                <Wand2 size={20} />
            </button>
        </div>
    );
};

export default LayoutPicker;
