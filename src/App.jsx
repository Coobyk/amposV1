import React, { useState, useEffect } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import SlideNav from './components/SlideNav';
import SlideCanvas from './components/SlideCanvas';
import LayoutPicker from './components/LayoutPicker';
import StylePanel from './components/StylePanel';

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTool, setActiveTool] = useState('text');
  const [isClosingStylePanel, setIsClosingStylePanel] = useState(false);

  // Theme State
  const [theme, setTheme] = useState({
    mode: 'dark',
    accent: '#6366f1',
    font: 'minimal'
  });

  const [slides, setSlides] = useState([
    {
      id: 1,
      title: 'AESTHETIC TITLE',
      subtitle: 'Presentation Subtitle',
      content: ['Some description', 'Other text', 'Another bullet point'],
      image: null,
      type: 'cover'
    }
  ]);

  // Apply Theme Side Effects
  useEffect(() => {
    const root = document.documentElement;

    // Apply Mode
    if (theme.mode === 'light') {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f4f4f5');
      root.style.setProperty('--text-primary', '#18181b');
      root.style.setProperty('--text-secondary', '#71717a');

      root.style.setProperty('--bg-paper', '#ffffff');
      root.style.setProperty('--text-paper', '#18181b');
    } else {
      root.style.setProperty('--bg-primary', '#09090b');
      root.style.setProperty('--bg-secondary', '#18181b');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a1a1aa');

      root.style.setProperty('--bg-paper', '#18181b'); // Dark paper for dark mode
      root.style.setProperty('--text-paper', '#ffffff');
    }

    // Apply Accent
    root.style.setProperty('--accent-primary', theme.accent);
    root.style.setProperty('--accent-secondary', `${theme.accent}20`); // 20 hex alpha

    // Apply Fonts
    let headingFont = "'Outfit', sans-serif";
    let bodyFont = "'Inter', sans-serif";

    if (theme.font === 'classic') {
      headingFont = "'Times New Roman', serif";
      bodyFont = "'Times New Roman', serif";
    } else if (theme.font === 'bold') {
      headingFont = "'Arial Black', sans-serif";
      bodyFont = "'Arial', sans-serif";
    }

    root.style.setProperty('--font-heading', headingFont);
    root.style.setProperty('--font-body', bodyFont);

  }, [theme]);

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
    // Toggle style panel if already active
    if (toolId === 'style' && activeTool === 'style') {
      setIsClosingStylePanel(true);
      setTimeout(() => {
        setActiveTool('text');
        setIsClosingStylePanel(false);
      }, 300); // Match animation duration
      return;
    }

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
      // Highlight logic
      const imageArea = document.querySelector('.slide-image-area');
      if (imageArea) {
        imageArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        imageArea.style.transition = 'all 0.3s';
        imageArea.style.boxShadow = `0 0 0 4px ${theme.accent}`;
        setTimeout(() => imageArea.style.boxShadow = 'none', 500);
      }
    }
  };

  return (
    <div className={`app-container ${theme.mode}`}>
      <div className="noise-overlay" />

      <Sidebar activeTool={activeTool} onToolSelect={handleToolSelect} />

      <main className="main-content relative overflow-hidden">
        <SlideNav
          slides={slides}
          activeSlide={activeSlide}
          onSelectSlide={setActiveSlide}
          onAddSlide={handleAddSlide}
        />

        <div className="editor-area relative">
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

          {/* Style Panel Overlay */}
          {activeTool === 'style' && (
            <StylePanel
              theme={theme}
              onThemeChange={setTheme}
              onClose={() => {
                setIsClosingStylePanel(true);
                setTimeout(() => {
                  setActiveTool('text');
                  setIsClosingStylePanel(false);
                }, 300);
              }}
              isClosing={isClosingStylePanel}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
