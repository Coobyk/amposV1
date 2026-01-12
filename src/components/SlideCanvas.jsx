import React, { useEffect, useRef, useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';

const SlideCanvas = ({ slide, onUpdate }) => {
    if (!slide) return null;
    const fileInputRef = useRef(null);

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

    // Handler for Subtitle
    const handleSubtitleChange = (e) => {
        onUpdate({ subtitle: e.target.value });
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

    // Image Handlers
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) handleImageFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleImageFile(file);
    };

    const handleImageFile = (file) => {
        // Check if it is an image
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            onUpdate({ image: e.target.result });
        };
        reader.readAsDataURL(file);
    };

    const [gradientPosition, setGradientPosition] = useState(null);

    // Set random gradient position on mount
    useEffect(() => {
        const positions = [
            { name: 'top-left', style: { left: '-10%', top: '-10%' } },
            { name: 'top-right', style: { right: '-10%', top: '-10%' } },
            { name: 'bottom-left', style: { left: '-10%', bottom: '-10%' } },
            { name: 'bottom-right', style: { right: '-10%', bottom: '-10%' } }
        ];
        const randomPos = positions[Math.floor(Math.random() * positions.length)];
        setGradientPosition(randomPos);
    }, [slide?.id]); // Re-randomize when slide changes

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
            {/* Background Ambience - Dynamic Position */}
            {gradientPosition && (
                <>
                    <div
                        className={`glow-effect glow-${gradientPosition.name}`}
                        style={gradientPosition.style}
                    />
                    <div
                        className={`glow-effect glow-${gradientPosition.name}`}
                        style={{
                            ...gradientPosition.style,
                            opacity: 0.08,
                            background: 'var(--accent-secondary)'
                        }}
                    />
                </>
            )}

            <div className={`slide-content ${getLayoutClasses(slide.type)}`}>
                {/* Image Area */}
                {slide.type !== 'centered' && slide.type !== 'left-align' && (
                    <div
                        className="slide-image-area cursor-pointer hover:bg-black/5 transition-colors relative group"
                        onClick={handleImageClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {slide.image ? (
                            <div className="w-full h-full relative">
                                <img src={slide.image} alt="Slide" className="w-full h-full object-cover rounded-xl" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium transition-opacity rounded-xl">
                                    Change Image
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="image-placeholder-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                </div>
                                <span className="slide-image-placeholder">Drop Image Here</span>
                                <span className="slide-image-source">Supports JPG, PNG, WebP</span>
                            </>
                        )}
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

                    {/* Editable Subtitle */}
                    <textarea
                        rows={1}
                        value={slide.subtitle || ""}
                        onChange={handleSubtitleChange}
                        onInput={(e) => adjustHeight(e.target)}
                        className={`slide-subtitle-input ${slide.type === 'centered' ? 'text-center' : ''}`}
                        placeholder={slide.type === 'cover' ? 'Presentation Subtitle' : 'Add a subtitle...'}
                    />

                    {/* Editable Content */}
                    <ul className={`slide-bullets ${slide.type === 'centered' ? 'items-center' : 'items-start'}`}>
                        {slide.content.map((item, i) => (
                            <li key={i} className="slide-bullet group/item relative pr-8 items-start">
                                <span className="slide-bullet-dot mt-3" /> {/* Fixed top alignment */}
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
                                    className="delete-btn"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        ))}

                        {/* Add Item Button */}
                        <li className="slide-bullet opacity-50 hover:opacity-100 cursor-pointer w-full" onClick={handleAddContent}>
                            <div className="w-2.5 h-2.5 rounded-full border border-zinc-400 flex items-center justify-center mr-0.5 mt-1.5">
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
