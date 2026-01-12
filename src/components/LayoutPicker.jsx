import React from 'react';
import { Wand2 } from 'lucide-react';

const layouts = [
    { id: 'cover', label: 'Cover' },
    { id: 'toc', label: 'TOC' },
    { id: 'intro', label: 'Intro' },
    { id: 'content', label: 'Content' },
    { id: 'image', label: 'Image' },
];

const LayoutPicker = () => {
    return (
        <div className="layout-picker">
            {layouts.map(({ id, label }) => (
                <button key={id} className="layout-option">
                    <div className="layout-option-preview">
                        <div className="layout-preview-image" />
                        <div className="layout-preview-text">
                            <div className="layout-preview-line" />
                            <div className="layout-preview-line" />
                        </div>
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
