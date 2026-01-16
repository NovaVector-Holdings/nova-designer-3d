import { useState } from 'react';
import { CADViewer } from './components/CADViewer';
import './App.css';

interface GenerationResult {
  success: boolean;
  scadCode: string;
  stlData: string | null;
  error?: string;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [history, setHistory] = useState<Array<{ prompt: string; result: GenerationResult }>>([]);

  const generateModel = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data: GenerationResult = await response.json();
      setResult(data);
      setHistory(prev => [...prev, { prompt, result: data }]);
    } catch (error) {
      console.error('Error generating model:', error);
      setResult({
        success: false,
        scadCode: '',
        stlData: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (item: { prompt: string; result: GenerationResult }) => {
    setPrompt(item.prompt);
    setResult(item.result);
  };

  const downloadSTL = () => {
    if (!result?.stlData) return;
    const binaryString = atob(result.stlData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model.stl';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadSCAD = () => {
    if (!result?.scadCode) return;
    const blob = new Blob([result.scadCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model.scad';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="header">
          <h1>AI CAD Creator</h1>
          <p>Generate 3D models with AI</p>
        </div>

        <div className="prompt-section">
          <label htmlFor="prompt">Describe your model:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a 20mm hexagonal die with 2mm walls, hollowed out to fit a 10mm diameter LED and battery compartment"
            rows={6}
            disabled={loading}
          />
          <button onClick={generateModel} disabled={loading || !prompt.trim()}>
            {loading ? 'Generating...' : 'Generate Model'}
          </button>
        </div>

        {result && (
          <div className="result-section">
            {result.error && (
              <div className="error">
                <strong>Note:</strong> {result.error}
              </div>
            )}

            <div className="code-preview">
              <div className="code-header">
                <h3>OpenSCAD Code</h3>
                <button onClick={downloadSCAD} className="small-btn">
                  Download .scad
                </button>
              </div>
              <pre><code>{result.scadCode}</code></pre>
            </div>

            {result.stlData && (
              <button onClick={downloadSTL} className="download-btn">
                Download STL
              </button>
            )}
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h3>History</h3>
            <div className="history-list">
              {history.slice().reverse().map((item, idx) => (
                <div
                  key={idx}
                  className="history-item"
                  onClick={() => loadFromHistory(item)}
                >
                  <div className="history-prompt">
                    {item.prompt.slice(0, 60)}
                    {item.prompt.length > 60 ? '...' : ''}
                  </div>
                  <div className="history-status">
                    {item.result.stlData ? '✓ Rendered' : '⚠ Code only'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="viewer-container">
        {result?.stlData ? (
          <CADViewer stlData={result.stlData} />
        ) : (
          <div className="viewer-placeholder">
            <div className="placeholder-content">
              <h2>3D Viewer</h2>
              <p>Enter a prompt and click "Generate Model" to see your 3D design</p>
              <div className="example-prompts">
                <h4>Example prompts:</h4>
                <ul>
                  <li>Create a 20mm hexagonal die with 2mm walls and LED cavity</li>
                  <li>Design a cubic dice with rounded edges and hollow interior</li>
                  <li>Make a dodecahedron die with electronics compartment</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
