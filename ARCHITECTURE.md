# Nova Designer 3D - System Architecture

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                                 │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    React Application                           │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐    │  │
│  │  │   Top Nav   │  │   Toolbar    │  │   Status Bar      │    │  │
│  │  │  Nova Logo  │  │  16 Buttons  │  │   System Status   │    │  │
│  │  └─────────────┘  └──────────────┘  └───────────────────┘    │  │
│  │  ┌─────────┬─────────────────────────────┬─────────────┐     │  │
│  │  │  Left   │      3D Viewer              │   Right     │     │  │
│  │  │  Panel  │    (Three.js)               │   Panel     │     │  │
│  │  │  - AI   │    - STL Rendering          │   - Code    │     │  │
│  │  │  - Hist │    - Orbit Controls         │   - View    │     │  │
│  │  └─────────┴─────────────────────────────┴─────────────┘     │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              ↕ HTTP                                  │
└─────────────────────────────────────────────────────────────────────┘
                               ↕
┌─────────────────────────────────────────────────────────────────────┐
│                      EXPRESS SERVER (Port 3001)                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  POST /api/generate                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │  │
│  │  │   Receive    │→ │   Call       │→ │   Execute    │        │  │
│  │  │   Prompt     │  │   Claude API │  │   OpenSCAD   │        │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘        │  │
│  │         ↓                  ↓                  ↓                │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │  │
│  │  │   Validate   │  │   Get        │  │   Generate   │        │  │
│  │  │   Input      │  │   SCAD Code  │  │   STL File   │        │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘        │  │
│  │         ↓                                     ↓                │  │
│  │  ┌──────────────────────────────────────────────────┐         │  │
│  │  │   Return { scadCode, stlData (base64) }         │         │  │
│  │  └──────────────────────────────────────────────────┘         │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                               ↕
┌─────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                               │
│  ┌──────────────────────┐         ┌─────────────────────────┐      │
│  │   Claude API         │         │   OpenSCAD CLI          │      │
│  │   (Anthropic)        │         │   (Local Install)       │      │
│  │                      │         │                         │      │
│  │  - Sonnet 4.5        │         │  - Reads .scad files    │      │
│  │  - Code generation   │         │  - Outputs .stl files   │      │
│  │  - Natural language  │         │  - 3D geometry engine   │      │
│  └──────────────────────┘         └─────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow: AI Prompt to 3D Model

```
1. USER INPUT
   ↓
   "Create 20mm hexagonal die with LED cavity"
   ↓
2. FRONTEND (App-New.tsx)
   ↓
   setState({ prompt })
   ↓
3. API CALL
   ↓
   POST /api/generate
   body: { prompt: "Create..." }
   ↓
4. SERVER (server.js)
   ↓
   Receive prompt
   ↓
5. CLAUDE API
   ↓
   client.messages.create({
     model: 'claude-sonnet-4-5',
     prompt: "Generate OpenSCAD code for..."
   })
   ↓
   Returns OpenSCAD code:
   ```
   difference() {
     cylinder(h=20, d=20, $fn=6);
     translate([0,0,5])
       sphere(d=10, $fn=50);
   }
   ```
   ↓
6. SAVE TO FILE
   ↓
   /temp/model_123456.scad
   ↓
7. OPENSCAD EXECUTION
   ↓
   exec: openscad -o model_123456.stl model_123456.scad
   ↓
   Generates binary STL file
   ↓
8. READ & ENCODE
   ↓
   stlData = fs.readFile(stlFile)
   base64STL = stlData.toString('base64')
   ↓
9. RETURN TO FRONTEND
   ↓
   {
     success: true,
     scadCode: "difference() {...}",
     stlData: "QVNDS..."
   }
   ↓
10. FRONTEND STATE UPDATE
   ↓
   setResult({ scadCode, stlData })
   ↓
11. THREE.JS RENDERING
   ↓
   - Decode base64 → binary
   - Parse with STLLoader
   - Create mesh with material
   - Add to scene
   - Auto-frame camera
   ↓
12. USER SEES 3D MODEL
```

---

## 🔘 Button Modification Flow

```
1. USER CLICKS "➕ Thicker"
   ↓
2. TOOLBAR (Toolbar.tsx)
   ↓
   onModify("increase wall thickness by 0.5mm")
   ↓
3. APP STATE UPDATE
   ↓
   modelState.modifications.push("increase wall thickness...")
   ↓
4. BUILD FULL PROMPT
   ↓
   basePrompt: "Create 20mm hexagonal die..."
   modifications: ["increase wall thickness by 0.5mm"]
   ↓
   fullPrompt = `${basePrompt}. Also, ${modifications.join(', and ')}`
   ↓
   = "Create 20mm hexagonal die. Also, increase wall thickness by 0.5mm"
   ↓
5. REGENERATE
   ↓
   [Same flow as above from step 3]
   ↓
6. NEW MODEL RENDERED
   ↓
   User sees updated design with thicker walls
```

---

## 🗂️ Component Hierarchy

```
App-New.tsx (Root)
├── NovaDesignerWordmark (Logo + Title)
│   └── NovaVectorLogo (SVG)
│
├── Toolbar
│   ├── Generate Tab
│   └── Modify Design Tab
│       ├── Dimensions Tool Group
│       ├── Features Tool Group
│       ├── Shape Tool Group
│       └── Walls Tool Group
│
├── Left Panel
│   ├── AI Prompt Section
│   │   ├── Textarea
│   │   └── Generate Button
│   ├── Current Design Display
│   │   ├── Base Prompt
│   │   └── Modifications List
│   └── History Section
│       └── Design Cards
│
├── Viewer Area
│   ├── CADViewer (Three.js)
│   │   ├── Scene
│   │   ├── Camera
│   │   ├── Renderer
│   │   ├── Controls (Orbit)
│   │   ├── Lights
│   │   ├── Grid Helper
│   │   ├── Axes Helper
│   │   └── STL Mesh
│   │
│   ├── Placeholder (when no model)
│   │   └── Quick Start Templates
│   │
│   └── Floating Actions
│       ├── Download STL
│       ├── Download SCAD
│       └── Toggle Code View
│
├── Right Panel (Conditional)
│   └── Code Viewer
│       └── OpenSCAD Source
│
└── Status Bar
    ├── Left: Status Messages
    └── Right: System Indicators
```

---

## 💾 State Management

```typescript
// App-New.tsx state structure

interface ModelState {
  basePrompt: string;           // Original user prompt
  modifications: string[];      // Array of button actions
  result: GenerationResult;     // Current code + STL
}

interface GenerationResult {
  success: boolean;
  scadCode: string;             // OpenSCAD source
  stlData: string | null;       // Base64 encoded STL
  error?: string;
}

// Current state
const [modelState, setModelState] = useState<ModelState>({
  basePrompt: '',
  modifications: [],
  result: null
});

// History
const [history, setHistory] = useState<ModelState[]>([]);

// UI state
const [prompt, setPrompt] = useState('');
const [loading, setLoading] = useState(false);
const [showPromptPanel, setShowPromptPanel] = useState(true);
const [showCodePanel, setShowCodePanel] = useState(false);
```

---

## 🎨 CSS Architecture

```
App.css
├── Legacy Styles (lines 1-277)
│   └── Original sidebar layout
│
└── Professional Styles (lines 279-867)
    ├── .app-pro (Main container)
    ├── .top-nav (Navigation bar)
    ├── .toolbar (Tool system)
    ├── .left-panel (AI prompts)
    ├── .viewer-area (3D canvas)
    ├── .right-panel (Code view)
    └── .status-bar (Bottom status)
```

**Design System:**
- Colors: CSS custom properties (could be extracted)
- Spacing: 4px base unit (4, 8, 12, 16, 20, 24...)
- Border radius: 4-8px
- Transitions: 0.2s ease
- Shadows: Subtle with brand color
- Typography: System fonts, 11-28px range

---

## 📡 API Specification

### Endpoint: POST /api/generate

**Request:**
```json
{
  "prompt": "Create a 20mm hexagonal die with 2mm walls"
}
```

**Response (Success):**
```json
{
  "success": true,
  "scadCode": "difference() { ... }",
  "stlData": "QVNDS0lJIFN..." // base64 encoded
}
```

**Response (Error - No OpenSCAD):**
```json
{
  "success": true,
  "scadCode": "difference() { ... }",
  "stlData": null,
  "error": "OpenSCAD not installed..."
}
```

**Response (Error - API):**
```json
{
  "success": false,
  "error": "Claude API error message"
}
```

---

## 🔐 Security Considerations

1. **API Key**: Stored in environment variable, never client-side
2. **Input Validation**: Prompts limited by Claude's content policy
3. **File System**: Temporary files cleaned up after generation
4. **Rate Limiting**: Inherits Claude API rate limits
5. **CORS**: Configured via Vite proxy, no direct exposure

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│              PRODUCTION DEPLOYMENT              │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │         Frontend (Vercel/Netlify)         │ │
│  │  - Static React build                     │ │
│  │  - CDN distributed                        │ │
│  │  - Environment: VITE_API_URL              │ │
│  └─────────────────┬─────────────────────────┘ │
│                    │                            │
│                    ↓ HTTPS                      │
│  ┌───────────────────────────────────────────┐ │
│  │         Backend (Railway/Render)          │ │
│  │  - Node.js Express server                 │ │
│  │  - Environment: ANTHROPIC_API_KEY         │ │
│  │  - OpenSCAD installed                     │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Note**: OpenSCAD requirement makes deployment complex. Consider:
- Docker container with OpenSCAD pre-installed
- Alternative: OpenSCAD WASM (if available)
- Fallback: Return code only, let users run locally

---

## 📊 Performance Characteristics

- **Initial Load**: ~500KB bundle (React + Three.js)
- **API Response**: 5-15 seconds (Claude generation + OpenSCAD)
- **3D Rendering**: <100ms (Three.js)
- **Memory**: ~50MB per session
- **Concurrency**: Limited by Claude API rate limits

---

## 🔧 Build Process

```
npm run build
     ↓
1. TypeScript Compilation (tsc)
     ↓
2. Vite Build
     ↓
   - Bundle React app
   - Minify JS/CSS
   - Optimize assets
   - Generate index.html
     ↓
3. Output: dist/
     ↓
   dist/
   ├── index.html
   ├── assets/
   │   ├── index-abc123.js
   │   └── index-def456.css
   └── ...
     ↓
4. Deploy
```

---

**Architecture designed for:**
- Scalability (stateless backend)
- Maintainability (component-based)
- Extensibility (plugin architecture possible)
- Performance (lazy loading, code splitting)
- User experience (smooth interactions)
