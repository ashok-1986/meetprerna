import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getMarkdownData(directory: string, filename: string) {
  const fullPath = path.join(contentDirectory, directory, `${filename}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    filename,
    contentHtml,
    ...(matterResult.data as { [key: string]: any }),
  };
}

export function getAllContentIds(directory: string) {
  const dirPath = path.join(contentDirectory, directory);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  const fileNames = fs.readdirSync(dirPath);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
