import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import SlideNav from './components/SlideNav';
import SlideCanvas from './components/SlideCanvas';
import LayoutPicker from './components/LayoutPicker';

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState([
    { id: 1, title: 'AESTHETIC TITLE', content: ['Some description', 'Other text', 'Another bullet point'], image: null, type: 'cover' }
  ]);

  return (
    <div className="flex h-screen w-screen bg-primary overflow-hidden relative">
      <div className="noise-overlay" />
      
      {/* Left Sidebar */}
      <Sidebar />

      <main className="flex-1 flex flex-col relative h-full">
        {/* Top Navigation */}
        <SlideNav 
          slides={slides} 
          activeSlide={activeSlide} 
          onSelectSlide={setActiveSlide} 
          onAddSlide={() => setSlides([...slides, { id: slides.length + 1, title: 'New Slide', content: [], type: 'content' }])}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden px-8 py-4">
          <div className="flex-1 flex flex-col glass-panel rounded-3xl overflow-hidden relative shadow-2xl">
            <SlideCanvas slide={slides[activeSlide]} />
            
            {/* Bottom Layout Picker */}
            <LayoutPicker />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
