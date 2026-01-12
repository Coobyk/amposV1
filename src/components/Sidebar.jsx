import React from 'react';
import { Type, Image, Sparkles, Palette, Settings, MoreHorizontal } from 'lucide-react';

const tools = [
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'ai', icon: Sparkles, label: 'AI' },
    { id: 'style', icon: Palette, label: 'Style' },
];

const Sidebar = ({ activeTool, onToolSelect }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">A</div>

            <div className="sidebar-tools">
                {tools.map(({ id, icon: Icon, label }) => (
                    <button
                        key={id}
                        className={`sidebar-tool ${activeTool === id ? 'active' : ''}`}
                        onClick={() => onToolSelect(id)}
                    >
                        <Icon size={22} className={activeTool === id ? "text-indigo-400" : ""} />
                        <span className="sidebar-tool-label">{label}</span>
                        {activeTool === id && <div className="active-indicator" />}
                    </button>
                ))}
            </div>

            <div className="sidebar-footer">
                <button><Settings size={20} /></button>
                <button><MoreHorizontal size={20} /></button>
            </div>
        </aside>
    );
};

export default Sidebar;
