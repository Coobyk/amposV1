import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import SlideNav from './components/SlideNav';
import SlideCanvas from './components/SlideCanvas';
import LayoutPicker from './components/LayoutPicker';

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: 'AESTHETIC TITLE',
      content: ['Some description', 'Other text', 'Another bullet point'],
      image: null,
      type: 'cover'
    }
  ]);

  const [activeTool, setActiveTool] = useState('text');

  const handleAddSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      title: 'New Slide',
      content: [],
      image: null,
      type: 'content'
    };
    setSlides([...slides, newSlide]);
    setActiveSlide(slides.length);
  };

  const updateSlide = (id, updates) => {
    setSlides(slides.map(slide =>
      slide.id === id ? { ...slide, ...updates } : slide
    ));
  };

  const handleToolSelect = (toolId) => {
    setActiveTool(toolId);

    // Tool Actions
    if (toolId === 'text') {
      // Focus the title input
      const titleInput = document.querySelector('.slide-title-input');
      if (titleInput) {
        titleInput.focus();
        titleInput.select();
      }
    }

    if (toolId === 'image') {
      // Highlight logic could go here, for now just log or simplified focus
      const imageArea = document.querySelector('.slide-image-area');
      if (imageArea) {
        imageArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Flash effect could be added class
        imageArea.style.opacity = '0.5';
        setTimeout(() => imageArea.style.opacity = '1', 200);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="noise-overlay" />

      <Sidebar activeTool={activeTool} onToolSelect={handleToolSelect} />

      <main className="main-content">
        <SlideNav
          slides={slides}
          activeSlide={activeSlide}
          onSelectSlide={setActiveSlide}
          onAddSlide={handleAddSlide}
        />

        <div className="editor-area">
          <div className="canvas-wrapper">
            <SlideCanvas
              slide={slides[activeSlide]}
              onUpdate={(updates) => updateSlide(slides[activeSlide].id, updates)}
            />
            <LayoutPicker
              activeSlide={slides[activeSlide]}
              onLayoutSelect={(layoutId) => updateSlide(slides[activeSlide].id, { type: layoutId })}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
