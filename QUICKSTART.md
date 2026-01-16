# Nova Designer 3D - Quick Start Guide

**Get designing in 3 minutes!**

---

## ⚡ Super Fast Setup

### 1. Install Dependencies (30 seconds)
```bash
cd /tmp/cad-creator
npm install
```

### 2. Set API Key (10 seconds)
```bash
export ANTHROPIC_API_KEY='your-anthropic-api-key-here'
```

Get your key from: https://console.anthropic.com/

### 3. Start Both Servers (30 seconds)

**Terminal 1:**
```bash
npm run server
```
Wait for: `CAD API Server running on port 3001`

**Terminal 2:**
```bash
npm run dev
```
Wait for: `http://localhost:3000`

### 4. Open Browser
```
http://localhost:3000
```

---

## 🎯 Your First Design (1 minute)

### Option A: Use a Template
1. Click one of the quick-start template buttons:
   - 📦 Hexagonal Die
   - 🔋 Battery Enclosure
   - ⬢ Dodecahedron Die

2. Watch it generate and render!

3. Click toolbar buttons to modify:
   - Click "➕ Thicker" to increase walls
   - Click "⬡ Chamfer" to round edges

4. Export:
   - Click "📥 STL" to download for 3D printing

### Option B: Write a Prompt
1. In the left panel, enter:
   ```
   Create a 20mm hexagonal die with 2mm walls,
   hollowed out to fit a 10mm diameter LED
   ```

2. Click "✨ Generate Design"

3. Wait 5-10 seconds for Claude to generate

4. View your 3D model!

---

## 🛠️ Using the Toolbar

### Switch to Modify Mode
1. Click the "Modify Design" tab in the toolbar
2. See 4 groups of tool buttons appear

### Quick Modifications

**Make it bigger:**
- Click "📏 Scale Up"

**Add electronics cavity:**
- Click "🕳️ Add Cavity"

**Round the edges:**
- Click "◯ Fillet"

**Thicker walls:**
- Click "➕ Thicker"

**Each click regenerates the model automatically!**

---

## 💡 Pro Tips

### Keyboard Shortcut
- Press `Cmd+Enter` (Mac) or `Ctrl+Enter` (Windows) to generate without clicking

### 3D Viewer Controls
- **Rotate**: Left-click + drag
- **Zoom**: Scroll wheel
- **Pan**: Right-click + drag

### Panel Management
- Click "◀" to collapse left panel for more viewer space
- Click "💻 Code" to see OpenSCAD source
- Click "▶" to close code panel

### Design History
- Scroll down in left panel to see "Recent Designs"
- Click any design to reload it

---

## 📥 Exporting Your Design

### For 3D Printing
1. Click "📥 STL" button
2. Open in your slicer (Cura, PrusaSlicer, etc.)
3. Print!

### For Further Editing
1. Click "📄 SCAD" button
2. Open in OpenSCAD application
3. Modify the code directly

### View Code
1. Click "💻 Code" button
2. See the generated OpenSCAD code
3. Copy/paste as needed

---

## 🐛 Troubleshooting

### "OpenSCAD not installed" message
- **You can still use the tool!** Code generation works fine
- STL download requires OpenSCAD: `brew install openscad`
- Alternative: Download SCAD file and use online OpenSCAD viewer

### API Key Error
```bash
# Make sure you exported it:
echo $ANTHROPIC_API_KEY

# If empty, set it:
export ANTHROPIC_API_KEY='sk-ant-...'
```

### Port Already in Use
```bash
# Kill processes on ports
lsof -ti:3000 | xargs kill
lsof -ti:3001 | xargs kill

# Then restart
```

### Model Doesn't Generate
- Check browser console (F12)
- Check server terminal for errors
- Verify internet connection (needs Claude API)

---

## 🎓 Example Prompts

### For Electronics Dice
```
Create a 25mm hexagonal die with 1.5mm walls,
add a 12mm cavity for LED at top and 10mm x 5mm
battery slot at bottom with wire channel
```

### For Enclosures
```
Design a 40mm cubic box with 2mm walls,
add screw holes in corners and cable routing channel
```

### For Complex Shapes
```
Make a dodecahedron 30mm diameter, hollow with 2mm walls,
filleted edges, with central spherical cavity for electronics
```

### General Tips
- Specify dimensions in mm
- Mention wall thickness
- Describe cavity/compartment locations
- Include features like "rounded edges" or "chamfered corners"

---

## 📚 Learn More

- [NOVA_DESIGNER_3D.md](NOVA_DESIGNER_3D.md) - Full UI documentation
- [TRANSFORMATION_SUMMARY.md](TRANSFORMATION_SUMMARY.md) - What changed
- [README.md](README.md) - Complete technical docs

---

## 🆘 Need Help?

1. Check the placeholder text in prompt box for examples
2. Try the quick-start templates first
3. Use simple prompts, then refine with toolbar
4. View generated code to understand what Claude created

---

**Happy Designing! 🎲✨**

*Nova Designer 3D - Powered by Nova Vector Holdings*
