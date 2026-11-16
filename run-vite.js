#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatic fix for Linux NTFS / fuseblk / noexec mounts
if (process.platform === 'linux') {
  const localEsbuild = path.resolve(__dirname, 'node_modules/@esbuild/linux-x64/bin/esbuild');
  const tmpEsbuild = path.join(os.tmpdir(), 'esbuild');
  
  if (fs.existsSync(tmpEsbuild)) {
    process.env.ESBUILD_BINARY_PATH = tmpEsbuild;
  } else if (fs.existsSync(localEsbuild)) {
    try {
      fs.copyFileSync(localEsbuild, tmpEsbuild);
      fs.chmodSync(tmpEsbuild, 0o755);
      process.env.ESBUILD_BINARY_PATH = tmpEsbuild;
    } catch (e) {
      // If it fails with ETXTBSY, it's already there and active
      process.env.ESBUILD_BINARY_PATH = tmpEsbuild;
    }
  }
}

const vitePath = path.resolve(__dirname, 'node_modules/vite/bin/vite.js');
const args = process.argv.slice(2);

const child = spawn(process.execPath, [vitePath, ...args], {
  stdio: 'inherit',
  env: process.env
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
