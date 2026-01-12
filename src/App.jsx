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

  return (
    <div className="app-container">
      <div className="noise-overlay" />

      <Sidebar />

      <main className="main-content">
        <SlideNav
          slides={slides}
          activeSlide={activeSlide}
          onSelectSlide={setActiveSlide}
          onAddSlide={handleAddSlide}
        />

        <div className="editor-area">
          <div className="canvas-wrapper">
            <SlideCanvas slide={slides[activeSlide]} />
            <LayoutPicker />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
