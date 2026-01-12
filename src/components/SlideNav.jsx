import React from 'react';
import { Plus, LayoutGrid, Layers } from 'lucide-react';

const getRenderConfig = (type) => {
    switch (type) {
        case 'cover': return { type: 'centered', lines: [80, 50], showImage: false };
        case 'toc': return { type: 'list', lines: [60, 60, 60], showImage: false };
        case 'intro': return { type: 'split', lines: [70, 40], showImage: true };
        case 'image': return { type: 'full', lines: [], showImage: true };
        case 'content':
        default: return { type: 'split-right', lines: [50, 60, 40], showImage: true };
    }
};

const SlideNav = ({ slides, activeSlide, onSelectSlide, onAddSlide }) => {
    return (
        <nav className="slide-nav">
            <div className="slide-thumbnails">
                {slides.map((slide, index) => {
                    const config = getRenderConfig(slide.type);

                    return (
                        <button
                            key={slide.id}
                            onClick={() => onSelectSlide(index)}
                            className={`slide-thumbnail ${activeSlide === index ? 'active' : ''}`}
                        >
                            <div className="slide-thumbnail-inner p-0 overflow-hidden relative">
                                {/* Mini Grid representation */}
                                <div className={`layout-mini-grid type-${config.type}`}>
                                    {config.showImage && <div className="mini-image bg-zinc-700/30 rounded-sm" />}
                                    <div className="mini-content flex flex-col gap-1 flex-1 justify-center p-1">
                                        {slide.type === 'cover' && <div className="h-1.5 w-full bg-zinc-600 rounded-sm mb-1" />}
                                        {config.lines.map((width, i) => (
                                            <div key={i} className="h-0.5 bg-zinc-700/40 rounded-full" style={{ width: `${width}%` }} />
                                        ))}
                                    </div>
                                </div>

                                {/* Active Overlay */}
                                {activeSlide === index && <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none" />}
                            </div>

                            <span className="slide-thumbnail-number">{index + 1}</span>
                            <span className="slide-thumbnail-title">{slide.title}</span>
                        </button>
                    );
                })}

                <button onClick={onAddSlide} className="add-slide-btn">
                    <Plus size={24} />
                </button>
            </div>

            <div className="slide-nav-actions">
                <button><LayoutGrid size={20} /></button>
                <button><Layers size={20} /></button>
            </div>
        </nav>
    );
};

export default SlideNav;
