import { useState } from 'react';

interface ToolbarProps {
  onModify: (modification: string) => void;
  disabled: boolean;
}

export function Toolbar({ onModify, disabled }: ToolbarProps) {
  const [activeTab, setActiveTab] = useState<'modify' | 'generate'>('generate');

  const tools = {
    dimensions: [
      { icon: '📏', label: 'Scale Up', action: 'increase all dimensions by 20%' },
      { icon: '📐', label: 'Scale Down', action: 'decrease all dimensions by 20%' },
      { icon: '↕️', label: 'Taller', action: 'increase height by 30%' },
      { icon: '↔️', label: 'Wider', action: 'increase width by 30%' },
    ],
    features: [
      { icon: '🕳️', label: 'Add Cavity', action: 'add a centered cavity for electronics' },
      { icon: '🔲', label: 'Add Compartment', action: 'add a battery compartment at the bottom' },
      { icon: '⚡', label: 'Wire Channel', action: 'add a 2mm wire channel connecting cavities' },
      { icon: '🔩', label: 'Screw Holes', action: 'add 4 mounting screw holes in corners' },
    ],
    shape: [
      { icon: '⬡', label: 'Chamfer', action: 'add 1mm chamfer to all edges' },
      { icon: '◯', label: 'Fillet', action: 'add 2mm fillet to all edges' },
      { icon: '◇', label: 'Hollow', action: 'hollow out with 2mm walls' },
      { icon: '⬢', label: 'Hexagonal', action: 'convert to hexagonal shape' },
    ],
    walls: [
      { icon: '➕', label: 'Thicker', action: 'increase wall thickness by 0.5mm' },
      { icon: '➖', label: 'Thinner', action: 'decrease wall thickness by 0.5mm' },
      { icon: '🧱', label: 'Reinforce', action: 'add internal support ribs' },
      { icon: '⚖️', label: 'Optimize', action: 'optimize wall thickness for strength' },
    ]
  };

  return (
    <div className="toolbar">
      <div className="toolbar-tabs">
        <button
          className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate
        </button>
        <button
          className={`tab ${activeTab === 'modify' ? 'active' : ''}`}
          onClick={() => setActiveTab('modify')}
        >
          Modify Design
        </button>
      </div>

      {activeTab === 'modify' && (
        <div className="toolbar-content">
          <div className="tool-group">
            <div className="tool-group-label">Dimensions</div>
            <div className="tool-buttons">
              {tools.dimensions.map((tool, idx) => (
                <button
                  key={idx}
                  className="tool-btn"
                  onClick={() => onModify(tool.action)}
                  disabled={disabled}
                  title={tool.action}
                >
                  <span className="tool-icon">{tool.icon}</span>
                  <span className="tool-label">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="tool-group">
            <div className="tool-group-label">Features</div>
            <div className="tool-buttons">
              {tools.features.map((tool, idx) => (
                <button
                  key={idx}
                  className="tool-btn"
                  onClick={() => onModify(tool.action)}
                  disabled={disabled}
                  title={tool.action}
                >
                  <span className="tool-icon">{tool.icon}</span>
                  <span className="tool-label">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="tool-group">
            <div className="tool-group-label">Shape</div>
            <div className="tool-buttons">
              {tools.shape.map((tool, idx) => (
                <button
                  key={idx}
                  className="tool-btn"
                  onClick={() => onModify(tool.action)}
                  disabled={disabled}
                  title={tool.action}
                >
                  <span className="tool-icon">{tool.icon}</span>
                  <span className="tool-label">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="tool-group">
            <div className="tool-group-label">Walls</div>
            <div className="tool-buttons">
              {tools.walls.map((tool, idx) => (
                <button
                  key={idx}
                  className="tool-btn"
                  onClick={() => onModify(tool.action)}
                  disabled={disabled}
                  title={tool.action}
                >
                  <span className="tool-icon">{tool.icon}</span>
                  <span className="tool-label">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
