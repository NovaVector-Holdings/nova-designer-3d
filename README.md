# Nova Designer 3D

<div align="center">

[![Build](https://github.com/NovaVector-Holdings/nova-designer-3d/actions/workflows/build.yml/badge.svg)](https://github.com/NovaVector-Holdings/nova-designer-3d/actions)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**Professional AI-powered 3D CAD modeling tool**

*Powered by Nova Vector Holdings*

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Demo](#demo)

</div>

---

An enterprise-grade CAD design application that combines AI-powered generation with professional modeling tools. Uses Claude Sonnet 4.5 to generate OpenSCAD code from natural language, then renders in real-time using Three.js.

Perfect for designing **hexagonal cube-shaped dice hollowed for electronics**, enclosures, mechanical parts, and parametric designs!

## Features

### Dual-Mode Design Interface
- **AI Prompt Mode**: Describe your model in plain English, Claude generates OpenSCAD code
- **Toolbar Modification Mode**: Click buttons to modify designs (scale, add features, adjust walls, etc.)
- **Hybrid Workflow**: Start with AI, refine with buttons - or vice versa

### Professional CAD Capabilities
- **Real-Time 3D Rendering**: Interactive Three.js viewer with orbit controls
- **Parametric Modifications**: Adjust dimensions, add cavities, modify walls with one click
- **Export Options**: Download STL for 3D printing or OpenSCAD source for further editing
- **Design History**: Track and restore previous designs
- **Code Preview**: View and edit generated OpenSCAD code

### Specialized Features
- Electronics enclosures with precision cavities
- Automatic hollowing with configurable wall thickness
- Built-in support for LED, battery, and wire routing
- Hexagonal, cubic, and complex geometric shapes

## Prerequisites

1. **Node.js** (v18 or higher)
2. **OpenSCAD** (optional, for STL generation)
   - macOS: `brew install openscad`
   - Linux: `sudo apt install openscad`
   - Windows: Download from https://openscad.org/
3. **Anthropic API Key**
   - Get your key from https://console.anthropic.com/

## Quick Start

```bash
# Clone the repository
git clone https://github.com/NovaVector-Holdings/nova-designer-3d.git
cd nova-designer-3d

# Install dependencies
npm install
```

## Configuration

Set your Anthropic API key:

```bash
export ANTHROPIC_API_KEY='your-api-key-here'
```

Or create a `.env` file:

```
ANTHROPIC_API_KEY=your-api-key-here
```

## Running the Application

You need to run both the backend server and the frontend:

### Terminal 1: Start the Backend Server

```bash
npm run server
```

This starts the API server on port 3001 that handles Claude API calls and OpenSCAD execution.

### Terminal 2: Start the Frontend

```bash
npm run dev
```

This starts the Vite dev server on port 3000.

### Access the Application

Open your browser to http://localhost:3000

## Usage

### Example Prompts for Hexagonal Dice

1. **Basic Hexagonal Die with LED Cavity**:
   ```
   Create a 20mm hexagonal die with 2mm walls, hollowed out with a cavity for a 10mm diameter LED
   ```

2. **Dice with Battery Compartment**:
   ```
   Design a hexagonal cube die 25mm on each side with 1.5mm walls. Add a hollow chamber that's 15mm diameter and 8mm deep for a coin battery, with a small hole at the bottom for wiring
   ```

3. **Multi-Chamber Dice**:
   ```
   Make a 30mm hexagonal die with separate compartments: one 12mm cavity for an LED at the top and a 10mm x 5mm slot for a battery at the bottom, connected by a 2mm wire channel
   ```

4. **Rounded Hexagonal Die**:
   ```
   Create a hexagonal die 20mm across with filleted edges (2mm radius), hollowed interior with 2mm walls, and a centered 8mm spherical cavity for electronics
   ```

## Features in Detail

### AI Code Generation

The system sends your prompt to Claude Sonnet 4.5, which generates complete, valid OpenSCAD code. The AI understands:
- Geometric shapes and dimensions
- Hollowing and wall thickness
- Mounting points and cavities
- Electronics constraints
- Parametric design principles

### 3D Viewer

- **Orbit Controls**: Click and drag to rotate
- **Zoom**: Scroll to zoom in/out
- **Pan**: Right-click and drag
- **Auto-Framing**: Automatically centers and sizes your model
- **Material Preview**: Realistic material with lighting

### Export Options

- **STL Export**: Ready for 3D printing (requires OpenSCAD installed)
- **OpenSCAD Export**: Edit the source code further in OpenSCAD

## Without OpenSCAD

If OpenSCAD is not installed, the app will still:
- Generate and display the OpenSCAD code
- Allow you to download the .scad file
- Let you copy/paste the code into OpenSCAD manually

The 3D viewer will show a placeholder, but you can still use the generated code.

## Project Structure

```
cad-creator/
├── src/
│   ├── components/
│   │   └── CADViewer.tsx       # Three.js 3D viewer component
│   ├── App.tsx                 # Main application UI
│   ├── App.css                 # Application styles
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles
├── server.js                   # Express backend for Claude API + OpenSCAD
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **3D Rendering**: Three.js with STL loader
- **Backend**: Node.js + Express
- **AI**: Claude Sonnet 4.5 via Anthropic API
- **CAD**: OpenSCAD CLI

## Troubleshooting

### "OpenSCAD not installed" error
Install OpenSCAD using the commands above. You can still use the generated code without it.

### API Key errors
Make sure your `ANTHROPIC_API_KEY` environment variable is set before running `npm run server`.

### Port already in use
If ports 3000 or 3001 are in use, you can modify them in:
- Frontend: `vite.config.ts` (line 6)
- Backend: `server.js` (line 87)

### Model doesn't render
Check the browser console for errors. Ensure OpenSCAD successfully generated the STL file by checking the server logs.

## Future Enhancements

- Direct browser-based STL generation (no OpenSCAD required)
- More CAD formats (STEP, OBJ, GLTF)
- Design templates library
- Multi-material support
- Assembly mode for multiple parts
- Dimension annotations
- Integration with slicing software

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get running in 3 minutes
- **[UI Overview](NOVA_DESIGNER_3D.md)** - Complete feature documentation
- **[Architecture](ARCHITECTURE.md)** - Technical implementation details
- **[Transformation Summary](TRANSFORMATION_SUMMARY.md)** - Development history

## About Nova Vector Holdings

Nova Designer 3D is part of the Nova Vector Holdings portfolio of professional engineering and design tools.

**Website**: [Coming Soon]
**GitHub**: [@NovaVector-Holdings](https://github.com/NovaVector-Holdings)

## License

ISC License - see LICENSE file for details

---

<div align="center">

**Built with Claude Sonnet 4.5 and Three.js**

Made with ❤️ by [Nova Vector Holdings](https://github.com/NovaVector-Holdings)

[⭐ Star us on GitHub](https://github.com/NovaVector-Holdings/nova-designer-3d) • [🐛 Report Bug](https://github.com/NovaVector-Holdings/nova-designer-3d/issues) • [✨ Request Feature](https://github.com/NovaVector-Holdings/nova-designer-3d/issues)

</div>
