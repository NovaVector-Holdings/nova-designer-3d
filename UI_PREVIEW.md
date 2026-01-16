# AI CAD Creator - UI Preview

## Interface Layout

The application has a **split-panel layout**:

```
┌─────────────────────────────────────────────────────────────────────┐
│  AI CAD CREATOR                                    [3D Viewer]      │
├──────────────────┬──────────────────────────────────────────────────┤
│                  │                                                  │
│  SIDEBAR         │           INTERACTIVE 3D VIEWER                  │
│  (400px)         │                                                  │
│                  │     ╭─────────────────────────────╮              │
│ ┌──────────────┐ │     │                             │              │
│ │ Describe:    │ │     │      [3D Model Render]      │              │
│ │              │ │     │                             │              │
│ │ [Text Area]  │ │     │    • Orbit controls         │              │
│ │              │ │     │    • Grid + Axes            │              │
│ │              │ │     │    • Auto-framing           │              │
│ └──────────────┘ │     │    • Real-time lighting     │              │
│                  │     │                             │              │
│ [Generate Model] │     ╰─────────────────────────────╯              │
│                  │                                                  │
│ ┌──────────────┐ │                                                  │
│ │ OpenSCAD Code│ │                                                  │
│ │ [Code View]  │ │                                                  │
│ │              │ │                                                  │
│ └──────────────┘ │                                                  │
│                  │                                                  │
│ [Download STL]   │                                                  │
│ [Download .scad] │                                                  │
│                  │                                                  │
│ ┌──────────────┐ │                                                  │
│ │   History    │ │                                                  │
│ │ • Design 1   │ │                                                  │
│ │ • Design 2   │ │                                                  │
│ └──────────────┘ │                                                  │
└──────────────────┴──────────────────────────────────────────────────┘
```

## Color Scheme

- **Background**: Dark theme (#1a1a1a - almost black)
- **Sidebar**: Slightly lighter dark (#2a2a2a)
- **Accent Color**: Blue (#4a90e2) for buttons and highlights
- **Text**: White (#fff) on dark backgrounds
- **Borders**: Subtle dark gray (#444)
- **Code Background**: Very dark (#1a1a1a)
- **Code Text**: Light blue (#a0d0ff)

## Key UI Elements

### 1. Header
```
╔════════════════════════╗
║  AI CAD Creator       ║
║  Generate 3D models   ║
║  with AI              ║
╚════════════════════════╝
```

### 2. Prompt Input Area
```
┌────────────────────────────────┐
│ Describe your model:           │
│ ┌────────────────────────────┐ │
│ │ e.g., Create a 20mm       │ │
│ │ hexagonal die with 2mm    │ │
│ │ walls, hollowed out to    │ │
│ │ fit a 10mm LED...         │ │
│ └────────────────────────────┘ │
│                                │
│   [  Generate Model  ]         │
└────────────────────────────────┘
```

### 3. Code Preview Panel
```
┌────────────────────────────────┐
│ OpenSCAD Code    [Download]    │
├────────────────────────────────┤
│ // Generated OpenSCAD code     │
│ $fn = 100;                     │
│                                │
│ difference() {                 │
│   cylinder(h=20, d=30);        │
│   cylinder(h=20, d=26);        │
│ }                              │
└────────────────────────────────┘
```

### 4. 3D Viewer (Right Panel)
- **When Empty**: Shows placeholder with example prompts
- **With Model**: Shows rendered 3D model with:
  - Dark background
  - Grid floor (100x100)
  - XYZ axes (Red, Green, Blue)
  - Orbital camera controls
  - Blue metallic material on model

### 5. History List
```
┌────────────────────────────────┐
│ History                        │
├────────────────────────────────┤
│ ┌────────────────────────────┐ │
│ │ Create a 20mm hexagona... │ │
│ │ ✓ Rendered                │ │
│ └────────────────────────────┘ │
│ ┌────────────────────────────┐ │
│ │ Design a cubic dice wi... │ │
│ │ ⚠ Code only               │ │
│ └────────────────────────────┘ │
└────────────────────────────────┘
```

## Workflow

1. **User enters prompt** in the text area
2. **Clicks "Generate Model"** button (turns to "Generating..." while loading)
3. **Code appears** in the code preview panel
4. **3D model renders** automatically in the viewer
5. **User can**:
   - Rotate/zoom the 3D model
   - Download STL for 3D printing
   - Download .scad file to edit
   - Click history items to reload previous designs
   - Enter new prompt to regenerate

## Responsive Behavior

On smaller screens (< 768px):
- Layout switches to vertical stack
- Sidebar appears on top (50vh)
- Viewer appears below (50vh)

## Interactive Elements

All buttons have hover states:
- **Generate**: Blue → Darker blue
- **Download**: Green → Darker green
- **Small buttons**: Gray → Lighter gray
- **History items**: Dark → Slightly lighter on hover

---

**Note**: To see the actual running UI, start both servers and navigate to http://localhost:3000
