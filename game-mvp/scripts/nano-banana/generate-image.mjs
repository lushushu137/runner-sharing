#!/usr/bin/env node
/**
 * Nano Banana / Gemini image generator helper.
 *
 * - Reads API key from env: GOOGLE_API_KEY
 * - Produces a single image file returned as inlineData
 *
 * This script is for internal asset generation; do not commit any API keys.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function usage(exitCode = 0) {
  // Keep it short; this is not user-facing.
  console.log(`Usage:
  node game-mvp/scripts/nano-banana/generate-image.mjs \\
    --model nano-banana-pro-preview \\
    --prompt-file <path> | --prompt <text> \\
    --out <outputPathWithoutExtOrWithExt> \\
    [--ref <imageUrl> ...] \\
    [--inline <localImagePath> ...] \\
    [--temperature 0.12]

Env:
  GOOGLE_API_KEY (required)
`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = {
    refs: [],
    inline: [],
    temperature: 0.12,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--help" || a === "-h") usage(0);
    if (a === "--model") args.model = argv[++i];
    else if (a === "--prompt") args.prompt = argv[++i];
    else if (a === "--prompt-file") args.promptFile = argv[++i];
    else if (a === "--out") args.out = argv[++i];
    else if (a === "--ref") args.refs.push(argv[++i]);
    else if (a === "--inline") args.inline.push(argv[++i]);
    else if (a === "--temperature") args.temperature = Number(argv[++i]);
    else {
      console.error(`Unknown arg: ${a}`);
      usage(2);
    }
  }
  return args;
}

function guessMimeByPath(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "image/jpeg";
}

function ensureDirForFile(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function loadDotEnvFile(filePath) {
  if (!filePath) return;
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    let line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("export ")) line = line.slice("export ".length).trim();
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    if (!key) continue;
    let value = line.slice(eq + 1).trim();
    // Strip surrounding quotes.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function bootstrapEnv() {
  // Prefer explicit env; otherwise try local dot-env files.
  if (process.env.GOOGLE_API_KEY) return;

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(scriptDir, "..", "..", ".."); // /workspace
  const gameMvpRoot = path.resolve(scriptDir, "..", ".."); // /workspace/game-mvp

  loadDotEnvFile(path.join(repoRoot, ".env.local"));
  loadDotEnvFile(path.join(repoRoot, ".env"));
  loadDotEnvFile(path.join(gameMvpRoot, ".env.local"));
  loadDotEnvFile(path.join(gameMvpRoot, ".env"));
}

function extractFirstInlineImage(resp) {
  const candidates = resp?.candidates ?? [];
  for (const c of candidates) {
    const parts = c?.content?.parts ?? [];
    for (const p of parts) {
      const inline = p?.inlineData;
      if (inline?.data) {
        return { mimeType: inline.mimeType ?? "image/jpeg", data: inline.data };
      }
    }
  }
  throw new Error("No inlineData image returned by model");
}

async function main() {
  bootstrapEnv();
  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("Missing env GOOGLE_API_KEY");
    process.exit(1);
  }
  const model = args.model || "nano-banana-pro-preview";
  if (!args.out) {
    console.error("Missing --out");
    usage(2);
  }

  const prompt =
    args.prompt ??
    (args.promptFile ? fs.readFileSync(args.promptFile, "utf8") : null);
  if (!prompt) {
    console.error("Missing --prompt or --prompt-file");
    usage(2);
  }

  const parts = [{ text: prompt }];
  for (const imgPath of args.inline) {
    const mimeType = guessMimeByPath(imgPath);
    const data = fs.readFileSync(imgPath).toString("base64");
    parts.push({ inlineData: { mimeType, data } });
  }
  for (const uri of args.refs) {
    parts.push({ fileData: { mimeType: guessMimeByPath(uri), fileUri: uri } });
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const payload = {
    contents: [{ role: "user", parts }],
    generationConfig: {
      temperature: Number.isFinite(args.temperature) ? args.temperature : 0.12,
    },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 1200)}`);
  }
  const json = await res.json();
  const img = extractFirstInlineImage(json);

  const wantExt = path.extname(args.out);
  let outPath = args.out;
  if (!wantExt) {
    outPath += img.mimeType.endsWith("png") ? ".png" : ".jpg";
  }
  ensureDirForFile(outPath);
  fs.writeFileSync(outPath, Buffer.from(img.data, "base64"));
  console.log(outPath);
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});

