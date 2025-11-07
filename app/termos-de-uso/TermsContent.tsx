// app/termos-de-uso/TermsContent.tsx
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export default async function TermsContent() {
  const file = path.join(process.cwd(), 'content', 'terms.md');
  const md = await fs.promises.readFile(file, 'utf-8');
  const html = marked.parse(md);
  return (
    <div
      className="prose max-w-none mb-6"
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  );
}
