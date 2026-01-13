import React, { useEffect, useRef, useState } from 'react';
import { Plus, X, Trash2, ImagePlus } from 'lucide-react';

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
    const [underlineWidth, setUnderlineWidth] = useState(120);
    const titleRef = useRef(null);

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

    // Calculate Underline Width
    useEffect(() => {
        if (titleRef.current) {
            const tempSpan = document.createElement('span');
            const style = window.getComputedStyle(titleRef.current);
            tempSpan.style.font = style.font;
            tempSpan.style.fontWeight = style.fontWeight;
            tempSpan.style.fontSize = style.fontSize;
            tempSpan.style.fontFamily = style.fontFamily;
            tempSpan.style.letterSpacing = style.letterSpacing;
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'absolute';
            tempSpan.style.whiteSpace = 'pre';
            tempSpan.innerText = slide.title || "Slide Title";
            document.body.appendChild(tempSpan);

            const textWidth = tempSpan.offsetWidth;
            const containerWidth = titleRef.current.offsetWidth || 800;

            // Calculate 70% of text width, but cap it at 70% of the container width
            const calculatedWidth = textWidth * 0.7;
            const maxAllowedWidth = containerWidth * 0.7;

            const newWidth = Math.max(120, Math.min(calculatedWidth, maxAllowedWidth));
            setUnderlineWidth(newWidth);



            document.body.removeChild(tempSpan);
        }
    }, [slide.title, slide.type]);


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
                        style={{
                            ...gradientPosition.style,
                            animationDelay: '-2s',
                            animationDuration: '22s'
                        }}
                    />
                    <div
                        className={`glow-effect glow-${gradientPosition.name}`}
                        style={{
                            ...gradientPosition.style,
                            opacity: 0.08,
                            background: 'var(--accent-secondary)',
                            animationDelay: '-10s',
                            animationDuration: '28s'
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
                            className="hidden-file-input"
                            accept="image/*"
                            onChange={handleFileChange}
                        />


                        {slide.image ? (
                            <div className="w-full h-full relative overflow-hidden rounded-xl">
                                <img src={slide.image} alt="Slide" className="w-full h-full object-cover" />
                                <div className="image-upload-overlay">
                                    <ImagePlus size={24} />
                                    <span>Change Image</span>
                                </div>
                            </div>
                        ) : (
                            <div className="image-upload-placeholder">
                                <div className="upload-icon-circle">
                                    <ImagePlus size={28} strokeWidth={1.5} />
                                </div>
                                <span className="upload-text-main">Click or Drop Image</span>
                                <span className="upload-text-sub">Supports JPG, PNG, WebP</span>
                            </div>
                        )}

                    </div>
                )}

                {/* Text Area */}
                <div className={`slide-text-area ${slide.type === 'centered' ? 'items-center text-center' : ''}`}>

                    {/* Editable Title */}
                    <div className="slide-title-container">
                        <textarea
                            ref={titleRef}
                            rows={1}
                            value={slide.title}
                            onChange={handleTitleChange}
                            onInput={(e) => adjustHeight(e.target)}
                            className={`slide-title-input ${slide.type === 'cover' ? 'large' : ''} ${slide.type === 'centered' ? 'text-center' : ''}`}
                            placeholder="Slide Title"
                        />
                    </div>


                    <div
                        className="slide-title-underline"
                        style={{ width: `${underlineWidth}px` }}
                    />


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
                        <li className="slide-bullet add-item-bullet" onClick={handleAddContent}>
                            <div className="add-item-icon">
                                <Plus size={8} />
                            </div>
                            <span className="add-item-text">Add item</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SlideCanvas;
