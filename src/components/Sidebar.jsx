import React from 'react';
import { Type, Image, Sparkles, Palette, Settings, MoreHorizontal } from 'lucide-react';

const tools = [
    { icon: Type, label: 'Text' },
    { icon: Image, label: 'Image' },
    { icon: Sparkles, label: 'AI' },
    { icon: Palette, label: 'Style' },
];

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">A</div>

            <div className="sidebar-tools">
                {tools.map(({ icon: Icon, label }) => (
                    <button key={label} className="sidebar-tool">
                        <Icon size={22} />
                        <span className="sidebar-tool-label">{label}</span>
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
