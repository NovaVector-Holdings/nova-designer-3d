import Anthropic from '@anthropic-ai/sdk';
import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const TEMP_DIR = path.join(__dirname, 'temp');
await fs.mkdir(TEMP_DIR, { recursive: true });

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log('Generating CAD code for prompt:', prompt);

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `You are an expert OpenSCAD programmer. Generate OpenSCAD code for the following request:

${prompt}

Requirements:
- Generate complete, valid OpenSCAD code
- For dice, ensure proper hollowing with wall thickness
- Add chamfers or fillets where appropriate
- Include mounting points or cavities for electronics if mentioned
- Use proper parameterization
- Return ONLY the OpenSCAD code, no explanations

OpenSCAD code:`
      }]
    });

    const scadCode = message.content[0].text;

    const timestamp = Date.now();
    const scadFile = path.join(TEMP_DIR, `model_${timestamp}.scad`);
    const stlFile = path.join(TEMP_DIR, `model_${timestamp}.stl`);

    await fs.writeFile(scadFile, scadCode);

    try {
      await execAsync(`openscad -o "${stlFile}" "${scadFile}"`);

      const stlData = await fs.readFile(stlFile);
      const base64STL = stlData.toString('base64');

      await fs.unlink(scadFile);
      await fs.unlink(stlFile);

      res.json({
        success: true,
        scadCode,
        stlData: base64STL
      });
    } catch (execError) {
      console.error('OpenSCAD execution error:', execError);
      res.json({
        success: true,
        scadCode,
        stlData: null,
        error: 'OpenSCAD not installed. Install from https://openscad.org/ or the code preview is shown.'
      });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`CAD API Server running on port ${PORT}`);
  console.log('Make sure ANTHROPIC_API_KEY is set in environment');
});
