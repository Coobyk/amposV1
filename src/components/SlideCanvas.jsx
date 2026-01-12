import React, { useEffect, useRef } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';

const SlideCanvas = ({ slide, onUpdate }) => {
    if (!slide) return null;

    // Auto-resize helper
    const adjustHeight = (el) => {
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    };

    // Handler for Title
    const handleTitleChange = (e) => {
        onUpdate({ title: e.target.value });
        adjustHeight(e.target);
    };

    // Handler for Bullets
    const handleContentChange = (index, newValue) => {
        const newContent = [...slide.content];
        newContent[index] = newValue;
        onUpdate({ content: newContent });
    };

    const handleAddContent = () => {
        onUpdate({ content: [...slide.content, ''] });
    };

    const handleDeleteContent = (index) => {
        const newContent = slide.content.filter((_, i) => i !== index);
        onUpdate({ content: newContent });
    };

    const getLayoutClasses = (type) => {
        switch (type) {
            case 'centered': return 'flex-col items-center text-center justify-center pt-20';
            case 'left-align': return 'flex-col items-start justify-center pt-20';
            case 'full-image': return 'items-center justify-center';
            case 'split-right': return 'flex-row-reverse';
            case 'split': default: return 'flex-row';
        }
    };

    return (
        <div className={`slide-canvas ${slide.type === 'full-image' ? 'p-0' : ''}`}>
            {/* Background Ambience */}
            <div className="glow-effect" style={{ right: '-10%', bottom: '-10%' }} />
            <div className="glow-effect" style={{ left: '-10%', top: '-10%', opacity: 0.08, background: 'var(--accent-secondary)' }} />

            <div className={`slide-content ${getLayoutClasses(slide.type)}`}>
                {/* Image Area - Hide for text-only layouts */}
                {slide.type !== 'centered' && slide.type !== 'left-align' && (
                    <div className="slide-image-area">
                        <div className="image-placeholder-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                        </div>
                        <span className="slide-image-placeholder">Drop Image Here</span>
                        <span className="slide-image-source">Supports JPG, PNG, WebP</span>
                    </div>
                )}

                {/* Text Area */}
                <div className={`slide-text-area ${slide.type === 'centered' ? 'items-center text-center' : ''}`}>

                    {/* Editable Title */}
                    <textarea
                        rows={1}
                        value={slide.title}
                        onChange={handleTitleChange}
                        onInput={(e) => adjustHeight(e.target)}
                        className={`slide-title-input ${slide.type === 'cover' ? 'large' : ''} ${slide.type === 'centered' ? 'text-center' : ''}`}
                        placeholder="Slide Title"
                    />

                    <div className="slide-title-underline" />

                    <p className="slide-subtitle">
                        {slide.type === 'cover' ? 'Presentation Subtitle' : '(Simple sans-serif font with slight noise effect)'}
                    </p>

                    {/* Editable Content */}
                    <ul className={`slide-bullets ${slide.type === 'centered' ? 'items-center' : 'items-start'}`}>
                        {slide.content.map((item, i) => (
                            <li key={i} className="slide-bullet group/item relative pr-8">
                                <span className="slide-bullet-dot mt-2" />
                                <textarea
                                    rows={1}
                                    value={item}
                                    onChange={(e) => handleContentChange(i, e.target.value)}
                                    onInput={(e) => adjustHeight(e.target)}
                                    className={`slide-bullet-input ${slide.type === 'centered' ? 'text-center' : 'text-left'}`}
                                    placeholder="List item..."
                                />

                                {/* Delete Action */}
                                <button
                                    onClick={() => handleDeleteContent(i)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover/item:opacity-100 text-zinc-400 hover:text-red-500 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        ))}

                        {/* Add Item Button */}
                        <li className="slide-bullet opacity-50 hover:opacity-100 cursor-pointer w-full" onClick={handleAddContent}>
                            <div className="w-2.5 h-2.5 rounded-full border border-zinc-400 flex items-center justify-center mr-0.5">
                                <Plus size={8} className="text-zinc-500" />
                            </div>
                            <span className="text-zinc-400 font-medium">Add item</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SlideCanvas;
