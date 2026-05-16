import fs from 'node:fs';
import path from 'node:path';

/**
 * Reads the current project version from VERSION.md.
 * This is a server-side utility.
 */
export function getProjectVersion(): string {
  try {
    const versionPath = path.join(process.cwd(), 'VERSION.md');
    const version = fs.readFileSync(versionPath, 'utf8').trim();
    return version;
  } catch (error) {
    console.error('Failed to read VERSION.md:', error);
    return '0.0.0';
  }
}
