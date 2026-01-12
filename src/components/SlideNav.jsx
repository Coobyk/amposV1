import React from 'react';
import { Plus, LayoutGrid, Layers } from 'lucide-react';

const SlideNav = ({ slides, activeSlide, onSelectSlide, onAddSlide }) => {
    return (
        <nav className="slide-nav">
            <div className="slide-thumbnails">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => onSelectSlide(index)}
                        className={`slide-thumbnail ${activeSlide === index ? 'active' : ''}`}
                    >
                        <div className="slide-thumbnail-inner">
                            <div className="slide-thumbnail-line" />
                            <div className="slide-thumbnail-line" />
                            <div className="slide-thumbnail-line" />
                        </div>
                        <span className="slide-thumbnail-number">{index + 1}</span>
                        <span className="slide-thumbnail-title">{slide.title}</span>
                    </button>
                ))}

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
