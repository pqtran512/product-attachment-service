import * as fs from 'fs';
import * as path from 'path';

export function buildFileTree(dir: string): any {
  const stats = fs.statSync(dir);

  if (stats.isDirectory()) {
    return {
      name: path.basename(dir),
      type: 'folder',
      children: fs.readdirSync(dir).map((child) =>
        buildFileTree(path.join(dir, child)),
      ),
    };
  }

  return {
    name: path.basename(dir),
    type: 'file',
    extension: path.extname(dir),
  };
}
