import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, Type, Image as ImageIcon, MessageSquare, X, Check, BrainCircuit } from 'lucide-react';

const AIPanel = ({ slide, onUpdate, onClose, isClosing, theme }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    const aiActions = [
        {
            id: 'expand',
            icon: Type,
            label: 'Expand Content',
            description: 'Generate more detailed bullet points based on your title.',
            prompt: 'Expand these ideas into professional presentation bullets...'
        },
        {
            id: 'summarize',
            icon: BrainCircuit,
            label: 'Summarize',
            description: 'Condense your content into a clear, concise summary.',
            prompt: 'Summarize the following content for a slide...'
        },
        {
            id: 'image-prompt',
            icon: ImageIcon,
            label: 'Visual Ideas',
            description: 'Generate creative image prompts for this slide.',
            prompt: 'Give me 3 artistic image prompt ideas for a slide titled...'
        },
        {
            id: 'tone',
            icon: MessageSquare,
            label: 'Change Tone',
            description: 'Rewrite content in a different style (Bold, Corporate, etc).',
            prompt: 'Rewrite this slide content in a more professional tone...'
        }
    ];

    const handleAction = (action) => {
        setSelectedAction(action);
        setIsGenerating(true);

        // Simulate AI "Generation" delay
        setTimeout(() => {
            setIsGenerating(false);

            // Mock responses based on action
            if (action.id === 'expand') {
                const mockContent = [
                    'In-depth analysis of market trends and consumer behavior',
                    'Strategic implementation of core aesthetic principles',
                    'Future-proofing design systems for scalable growth'
                ];
                onUpdate({ content: [...slide.content, ...mockContent] });
            } else if (action.id === 'tone') {
                onUpdate({
                    title: slide.title.toUpperCase(),
                    subtitle: 'ELEVATING THE STANDARD OF MODERN PRESENTATIONS'
                });
            }
        }, 1500);
    };

    return (
        <div className={`style-panel ai-panel ${isClosing ? 'closing' : ''}`}>
            <div className="style-panel-header">
                <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-accent" />
                    <h2 className="style-panel-title">AI Assistant</h2>
                </div>
                <button className="style-panel-close" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            <div className="ai-status-card mb-6">
                <div className="ai-status-icon">
                    <BrainCircuit size={24} />
                </div>
                <div className="ai-status-info">
                    <span className="ai-status-label">Magic Context</span>
                    <span className="ai-status-value">Reading Slide: "{slide.title || 'Untitled'}"</span>
                </div>
            </div>

            <div className="style-group">
                <label className="style-label">AI Actions</label>
                <div className="ai-actions-grid">
                    {aiActions.map((action) => (
                        <button
                            key={action.id}
                            className={`ai-action-card ${selectedAction?.id === action.id && isGenerating ? 'generating' : ''}`}
                            onClick={() => handleAction(action)}
                            disabled={isGenerating}
                        >
                            <div className="ai-action-icon-wrapper">
                                {selectedAction?.id === action.id && isGenerating ? (
                                    <RefreshCw size={20} className="animate-spin" />
                                ) : (
                                    <action.icon size={20} />
                                )}
                            </div>
                            <div className="ai-action-text">
                                <span className="ai-action-label">{action.label}</span>
                                <span className="ai-action-desc">{action.description}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selectedAction && !isGenerating && (
                <div className="ai-feedback-toast">
                    <Check size={14} />
                    <span>Applied {selectedAction.label}!</span>
                </div>
            )}

            <div className="ai-footer mt-auto pt-6">
                <div className="ai-disclaimer">
                    <Wand2 size={12} />
                    <span>AI can make mistakes. Verify important info.</span>
                </div>
            </div>
        </div>
    );
};

export default AIPanel;
