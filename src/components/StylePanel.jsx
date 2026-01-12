import React from 'react';
import { Sun, Moon, Type, Check, Palette } from 'lucide-react';

const fonts = [
    { id: 'minimal', label: 'Minimal', family: "'Inter', sans-serif", heading: "'Outfit', sans-serif" },
    { id: 'classic', label: 'Classic', family: "'Times New Roman', serif", heading: "'Times New Roman', serif" },
    { id: 'bold', label: 'Bold', family: "'Arial', sans-serif", heading: "'Arial Black', sans-serif" }
];

const colors = [
    '#6366f1', // Indigo (Default)
    '#ec4899', // Pink
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#8b5cf6', // Violet
    '#18181b', // Zinc (Black/White)
];

const StylePanel = ({ theme, onThemeChange }) => {
    return (
        <div className="style-panel">
            <h2 className="style-panel-title">Style & Theme</h2>

            {/* Mode Toggle */}
            <div className="style-group">
                <label className="style-label">Appearance</label>
                <div className="mode-toggle">
                    <button
                        className={`mode-btn ${theme.mode === 'dark' ? 'active' : ''}`}
                        onClick={() => onThemeChange({ ...theme, mode: 'dark' })}
                    >
                        <Moon size={16} />
                        <span>Dark</span>
                    </button>
                    <button
                        className={`mode-btn ${theme.mode === 'light' ? 'active' : ''}`}
                        onClick={() => onThemeChange({ ...theme, mode: 'light' })}
                    >
                        <Sun size={16} />
                        <span>Light</span>
                    </button>
                </div>
            </div>

            {/* Font Selector */}
            <div className="style-group">
                <label className="style-label">Typography</label>
                <div className="font-list">
                    {fonts.map((font) => (
                        <button
                            key={font.id}
                            onClick={() => onThemeChange({ ...theme, font: font.id })}
                            className={`font-btn ${theme.font === font.id ? 'active' : ''}`}
                        >
                            <div className="font-info">
                                <span className="font-name" style={{ fontFamily: font.heading }}>{font.label}</span>
                                <span className="font-preview" style={{ fontFamily: font.family }}>The quick brown fox</span>
                            </div>
                            {theme.font === font.id && <Check size={16} className="text-accent" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Picker */}
            <div className="style-group">
                <label className="style-label">Accent Color</label>
                <div className="color-grid">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => onThemeChange({ ...theme, accent: color })}
                            className={`color-btn ${theme.accent === color ? 'active' : ''}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}

                    {/* Custom Color Input Wrapper */}
                    <div className="color-custom-btn">
                        <input
                            type="color"
                            value={theme.accent}
                            onChange={(e) => onThemeChange({ ...theme, accent: e.target.value })}
                        />
                        <Palette size={16} className="custom-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StylePanel;
