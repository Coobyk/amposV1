import React from 'react';

const SlideCanvas = ({ slide }) => {
    if (!slide) return null;

    return (
        <div className="slide-canvas">
            <div className="slide-canvas-gradient" />

            <div className="slide-content">
                {/* Left Column: Image Area */}
                <div className="slide-image-area">
                    <span className="slide-image-placeholder">Some Image</span>
                    <span className="slide-image-source">https://image source</span>
                </div>

                {/* Right Column: Text Area */}
                <div className="slide-text-area">
                    <h1 className="slide-title">{slide.title}</h1>
                    <div className="slide-title-underline" />

                    <p className="slide-subtitle">(Simple sans-serif font with slight noise effect)</p>

                    {slide.content.length > 0 ? (
                        <ul className="slide-bullets">
                            {slide.content.map((item, i) => (
                                <li key={i} className="slide-bullet">
                                    <span className="slide-bullet-dot" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="slide-empty-hint">Start writing your presentation...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SlideCanvas;
