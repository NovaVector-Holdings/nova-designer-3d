import { useState } from 'react';
import { CADViewer } from './components/CADViewer';
import { NovaDesignerWordmark } from './components/Logo';
import { Toolbar } from './components/Toolbar';
import './App.css';

interface GenerationResult {
  success: boolean;
  scadCode: string;
  stlData: string | null;
  error?: string;
}

interface ModelState {
  basePrompt: string;
  modifications: string[];
  result: GenerationResult | null;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelState, setModelState] = useState<ModelState>({
    basePrompt: '',
    modifications: [],
    result: null
  });
  const [history, setHistory] = useState<Array<ModelState>>([]);
  const [showPromptPanel, setShowPromptPanel] = useState(true);
  const [showCodePanel, setShowCodePanel] = useState(false);

  const generateModel = async (fullPrompt: string, isModification = false) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt })
      });

      const data: GenerationResult = await response.json();

      if (isModification) {
        setModelState(prev => ({
          ...prev,
          result: data
        }));
      } else {
        const newState = {
          basePrompt: fullPrompt,
          modifications: [],
          result: data
        };
        setModelState(newState);
        setHistory(prev => [...prev, newState]);
      }
    } catch (error) {
      console.error('Error generating model:', error);
      const errorResult: GenerationResult = {
        success: false,
        scadCode: '',
        stlData: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
      setModelState(prev => ({ ...prev, result: errorResult }));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generateModel(prompt, false);
    setPrompt('');
  };

  const handleModification = (modification: string) => {
    if (!modelState.basePrompt) return;

    const newModifications = [...modelState.modifications, modification];
    setModelState(prev => ({
      ...prev,
      modifications: newModifications
    }));

    const fullPrompt = `${modelState.basePrompt}. Also, ${newModifications.join(', and ')}`;
    generateModel(fullPrompt, true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  const downloadSTL = () => {
    if (!modelState.result?.stlData) return;
    const binaryString = atob(modelState.result.stlData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nova-model.stl';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadSCAD = () => {
    if (!modelState.result?.scadCode) return;
    const blob = new Blob([modelState.result.scadCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nova-model.scad';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-pro">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-left">
          <NovaDesignerWordmark height={28} />
          <div className="nav-divider" />
          <div className="nav-menu">
            <button className="nav-btn active">Design</button>
            <button className="nav-btn">Library</button>
            <button className="nav-btn">Export</button>
          </div>
        </div>
        <div className="nav-right">
          <div className="powered-by">
            Powered by <span className="company-name">Nova Vector Holdings</span>
          </div>
          <button className="icon-btn" title="Settings">⚙️</button>
          <button className="icon-btn" title="Help">❓</button>
        </div>
      </nav>

      {/* Toolbar */}
      <Toolbar onModify={handleModification} disabled={loading || !modelState.result} />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Panel - Prompt & Properties */}
        <div className={`left-panel ${showPromptPanel ? 'visible' : 'collapsed'}`}>
          <div className="panel-header">
            <h3>AI Prompt</h3>
            <button
              className="collapse-btn"
              onClick={() => setShowPromptPanel(!showPromptPanel)}
            >
              {showPromptPanel ? '◀' : '▶'}
            </button>
          </div>

          {showPromptPanel && (
            <div className="panel-content">
              <div className="prompt-input-section">
                <label>Describe your design:</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Example: Create a 20mm hexagonal die with 2mm walls, hollowed out to fit a 10mm diameter LED and battery compartment"
                  rows={4}
                  disabled={loading}
                />
                <button
                  className="generate-btn-pro"
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? (
                    <>
                      <span className="spinner">⏳</span> Generating...
                    </>
                  ) : (
                    <>
                      <span>✨</span> Generate Design
                    </>
                  )}
                </button>
              </div>

              {modelState.basePrompt && (
                <div className="current-design-section">
                  <h4>Current Design</h4>
                  <div className="design-description">
                    <strong>Base:</strong> {modelState.basePrompt}
                  </div>
                  {modelState.modifications.length > 0 && (
                    <div className="modifications-list">
                      <strong>Modifications:</strong>
                      <ul>
                        {modelState.modifications.map((mod, idx) => (
                          <li key={idx}>{mod}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {modelState.result?.error && (
                <div className="error-message">
                  ⚠️ {modelState.result.error}
                </div>
              )}

              {history.length > 0 && (
                <div className="history-section-pro">
                  <h4>Recent Designs</h4>
                  <div className="history-grid">
                    {history.slice().reverse().slice(0, 5).map((item, idx) => (
                      <div
                        key={idx}
                        className="history-card"
                        onClick={() => setModelState(item)}
                      >
                        <div className="history-card-title">
                          {item.basePrompt.slice(0, 40)}...
                        </div>
                        <div className="history-card-status">
                          {item.result?.stlData ? '✓' : '⚠'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center - 3D Viewer */}
        <div className="viewer-area">
          {modelState.result?.stlData ? (
            <CADViewer stlData={modelState.result.stlData} />
          ) : (
            <div className="viewer-placeholder-pro">
              <div className="placeholder-icon">🎲</div>
              <h2>Nova Designer 3D</h2>
              <p>Enter a prompt or use the toolbar to start designing</p>
              <div className="quick-start">
                <h4>Quick Start Templates:</h4>
                <button
                  className="template-btn"
                  onClick={() => setPrompt('Create a 20mm hexagonal die with 2mm walls and LED cavity')}
                >
                  📦 Hexagonal Die
                </button>
                <button
                  className="template-btn"
                  onClick={() => setPrompt('Design a cubic enclosure 30mm with battery compartment')}
                >
                  🔋 Battery Enclosure
                </button>
                <button
                  className="template-btn"
                  onClick={() => setPrompt('Make a dodecahedron die with electronics cavity')}
                >
                  ⬢ Dodecahedron Die
                </button>
              </div>
            </div>
          )}

          {/* Floating Action Bar */}
          {modelState.result?.stlData && (
            <div className="floating-actions">
              <button className="action-btn" onClick={downloadSTL} title="Download STL">
                📥 STL
              </button>
              <button className="action-btn" onClick={downloadSCAD} title="Download SCAD">
                📄 SCAD
              </button>
              <button
                className="action-btn"
                onClick={() => setShowCodePanel(!showCodePanel)}
                title="View Code"
              >
                💻 Code
              </button>
            </div>
          )}
        </div>

        {/* Right Panel - Code View */}
        {showCodePanel && modelState.result?.scadCode && (
          <div className="right-panel">
            <div className="panel-header">
              <h3>OpenSCAD Code</h3>
              <button
                className="collapse-btn"
                onClick={() => setShowCodePanel(false)}
              >
                ▶
              </button>
            </div>
            <div className="code-viewer">
              <pre><code>{modelState.result.scadCode}</code></pre>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          {loading ? (
            <span className="status-item">🔄 Generating model...</span>
          ) : modelState.result?.stlData ? (
            <span className="status-item">✓ Model ready</span>
          ) : (
            <span className="status-item">Ready</span>
          )}
        </div>
        <div className="status-right">
          <span className="status-item">OpenSCAD {modelState.result?.stlData ? 'Connected' : 'Standby'}</span>
          <span className="status-item">Claude API Active</span>
        </div>
      </div>
    </div>
  );
}

export default App;
