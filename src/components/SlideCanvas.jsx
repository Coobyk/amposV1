import React, { useRef, useEffect } from 'react';

const SlideCanvas = ({ slide, onUpdate }) => {
    if (!slide) return null;

    // Handler for Title
    const handleTitleChange = (e) => {
        onUpdate({ title: e.target.value });
    };

    // Handler for Bullets
    const handleContentChange = (index, newValue) => {
        const newContent = [...slide.content];
        newContent[index] = newValue;
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
                <div className={`slide-text-area ${slide.type === 'centered' ? 'items-center' : ''}`}>
                    {/* Editable Title */}
                    <input
                        type="text"
                        value={slide.title}
                        onChange={handleTitleChange}
                        className={`slide-title-input ${slide.type === 'cover' ? 'large' : ''}`}
                        placeholder="Slide Title"
                    />

                    <div className="slide-title-underline" />

                    <p className="slide-subtitle">
                        {slide.type === 'cover' ? 'Presentation Subtitle' : '(Simple sans-serif font with slight noise effect)'}
                    </p>

                    {/* Editable Content */}
                    <ul className="slide-bullets">
                        {slide.content.map((item, i) => (
                            <li key={i} className="slide-bullet">
                                <span className="slide-bullet-dot" />
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleContentChange(i, e.target.value)}
                                    className="slide-bullet-input"
                                    placeholder="List item..."
                                />
                            </li>
                        ))}
                        {/* Always show one empty bullet if list is empty to allow typing */}
                        {slide.content.length === 0 && (
                            <li className="slide-bullet opacity-50">
                                <span className="slide-bullet-dot" />
                                <button
                                    onClick={() => onUpdate({ content: ['New item'] })}
                                    className="text-left w-full hover:text-indigo-500 transition-colors"
                                >
                                    Click to add text...
                                </button>
                            </li>
                        )}
                        {/* Add button */}
                        {slide.content.length > 0 && (
                            <li className="slide-bullet opacity-50 hover:opacity-100 cursor-pointer" onClick={() => onUpdate({ content: [...slide.content, ''] })}>
                                <span className="slide-bullet-dot bg-zinc-300" />
                                <span className="text-zinc-400">Add item</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SlideCanvas;
