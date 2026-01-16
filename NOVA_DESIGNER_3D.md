# Nova Designer 3D - UI Overview

**Powered by Nova Vector Holdings**

---

## 🎨 Brand Identity

### Logo
- **Hexagonal vector design** symbolizing precision and geometric modeling
- **Blue/Cyan gradient** (#0066FF → #00CCFF) representing technology and innovation
- **Geometric patterns** showing 3D vectors and nodes
- Scales from 24px to 80px for different use cases

### Color Palette
```
Primary Blue:    #0066FF  (Buttons, highlights, active states)
Accent Cyan:     #00CCFF  (Text highlights, hover states)
Dark Blue:       #0052CC  (Gradients, depth)
Background:      #0d0d0d  (Main canvas)
Panel Dark:      #151515  (Side panels)
Panel Medium:    #1a1a1a  (Toolbar, headers)
Border:          #333333  (Dividers, borders)
Text Primary:    #FFFFFF  (Headers, buttons)
Text Secondary:  #999999  (Labels, descriptions)
```

## 🖥️ Professional UI Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│  ⬢ Nova Designer 3D  │  Design  Library  Export  │  Powered by NVH  ⚙ │  ← Top Nav (56px)
├────────────────────────────────────────────────────────────────────────┤
│  [Generate] [Modify Design ▼]                                          │  ← Toolbar Tabs
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐             │
│  │ 📏 Scale │ 🕳️ Add   │ ⬡ Chamfer│ ➕ Thick │ More...  │             │  ← Tool Buttons
│  │   Up     │ Cavity   │          │          │          │             │
├───┬────────────────────────────────────────────────────────────────┬───┤
│ ◀ │                                                                │   │
│   │                  3D INTERACTIVE VIEWER                         │ C │
│ A │                                                                │ O │
│ I │              [Your 3D Model Rendered Here]                     │ D │
│   │                                                                │ E │
│ P │          • Orbit controls (drag to rotate)                     │   │
│ R │          • Grid floor with XYZ axes                            │ V │
│ O │          • Blue metallic material                              │ I │
│ M │          • Auto-framing & lighting                             │ E │
│ P │                                                                │ W │
│ T │                            ┌─────────────┐                     │   │
│   │                            │ 📥 STL      │  ← Floating Actions │ ▶ │
│ 3 │                            │ 📄 SCAD     │                     │   │
│ 2 │                            │ 💻 Code     │                     │   │
│ 0 │                            └─────────────┘                     │ 4 │
│ p │                                                                │ 0 │
│ x │                                                                │ 0 │
│   │                                                                │ p │
│   │                                                                │ x │
├───┴────────────────────────────────────────────────────────────────┴───┤
│  🔄 Model ready  │  OpenSCAD Connected  │  Claude API Active          │  ← Status Bar (28px)
└────────────────────────────────────────────────────────────────────────┘
```

## ⚙️ Key Features

### 1. **Top Navigation Bar**
- **Left**: Nova Designer 3D logo + wordmark, navigation menu (Design, Library, Export)
- **Right**: "Powered by Nova Vector Holdings" branding, settings, help icons
- **Styling**: Gradient background with blue accent border

### 2. **Toolbar System**
Two modes accessible via tabs:

#### Generate Tab (Default)
- Primary AI prompt interface
- Quick-start templates
- Design history

#### Modify Design Tab
**4 Tool Groups** with icon buttons:

**Dimensions**
- 📏 Scale Up - Increase all dimensions by 20%
- 📐 Scale Down - Decrease all dimensions by 20%
- ↕️ Taller - Increase height by 30%
- ↔️ Wider - Increase width by 30%

**Features**
- 🕳️ Add Cavity - Add centered electronics cavity
- 🔲 Add Compartment - Add battery compartment
- ⚡ Wire Channel - Add 2mm wire routing
- 🔩 Screw Holes - Add mounting holes

**Shape**
- ⬡ Chamfer - Add 1mm edge chamfers
- ◯ Fillet - Add 2mm rounded edges
- ◇ Hollow - Hollow with 2mm walls
- ⬢ Hexagonal - Convert to hex shape

**Walls**
- ➕ Thicker - Increase wall thickness +0.5mm
- ➖ Thinner - Decrease wall thickness -0.5mm
- 🧱 Reinforce - Add internal ribs
- ⚖️ Optimize - Auto-optimize thickness

### 3. **Left Panel (320px, Collapsible)**
- AI prompt textarea with syntax highlighting
- "✨ Generate Design" button with gradient
- Current design summary showing:
  - Base prompt
  - Applied modifications list
- Recent designs history (clickable cards)

### 4. **Center Viewer (Flexible)**
- Full Three.js 3D canvas
- Dark background (#0d0d0d)
- Grid floor + XYZ axis helpers
- Floating action buttons (bottom-right):
  - Download STL
  - Download OpenSCAD
  - View Code

### 5. **Right Panel (400px, Toggleable)**
- OpenSCAD code viewer
- Syntax highlighted
- Monospace font
- Collapsible via "💻 Code" button

### 6. **Status Bar (28px)**
- **Left**: Current operation status
- **Right**: System connections (OpenSCAD, Claude API)
- Blue accent border on top

## 🎯 Dual-Mode Workflow

### Method 1: AI → Buttons
1. Enter natural language prompt: "Create 20mm hexagonal die with LED cavity"
2. Click "✨ Generate Design"
3. View rendered model
4. Click toolbar buttons to modify (e.g., "➕ Thicker walls")
5. Each button regenerates with new modification

### Method 2: Templates → Buttons
1. Click quick-start template button
2. Model generates
3. Use toolbar to customize
4. Export when satisfied

### Method 3: Pure AI
1. Write detailed prompt with all specifications
2. Generate once
3. Export directly

## 🚀 Technical Implementation

### Components
- `Logo.tsx` - Nova Vector Holdings logo + wordmark SVG
- `Toolbar.tsx` - Tabbed toolbar with tool button groups
- `CADViewer.tsx` - Three.js 3D rendering engine
- `App-New.tsx` - Professional layout orchestration

### State Management
```typescript
interface ModelState {
  basePrompt: string;           // Original AI prompt
  modifications: string[];      // Array of button modifications
  result: GenerationResult;     // Current STL + code
}
```

When button clicked:
1. Append modification to array
2. Regenerate: `${basePrompt}. Also, ${modifications.join(', and ')}`
3. Update viewer with new STL

### Styling
- CSS custom properties for theme colors
- Flexbox for responsive layout
- CSS Grid for toolbar button groups
- Smooth transitions on all interactive elements
- Backdrop blur on floating elements

## 📱 Responsive Behavior

**Desktop (>1024px)**: Full 3-panel layout
**Tablet (768-1024px)**: Narrower panels, horizontal scroll on toolbar
**Mobile (<768px)**: Stacked vertical layout, collapsible panels

## 🎨 Visual Hierarchy

1. **Primary Actions**: Blue gradient buttons (Generate)
2. **Secondary Actions**: Gray buttons with blue hover (Tool buttons)
3. **Tertiary Actions**: Icon-only buttons (Settings, collapse)
4. **Informational**: Cyan text for highlights
5. **Status**: Bottom bar with muted colors

---

## 🏢 Nova Vector Holdings Portfolio Alignment

This tool fits into a professional suite of engineering/design applications:

- **Nova Designer 3D** (this tool) - CAD modeling
- Potential siblings:
  - Nova Circuit Designer - PCB layout
  - Nova Simulator Pro - FEA/CFD analysis
  - Nova ModelView - Collaboration platform
  - Nova Print Manager - 3D printing workflow

All sharing the hexagonal vector logo theme and blue/cyan color palette.

---

**Built with:** React 19, TypeScript, Three.js, Claude Sonnet 4.5, OpenSCAD
**Company:** Nova Vector Holdings
**License:** ISC
