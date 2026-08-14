import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export async function loadGameContent(root) {
  const html = await readFile(resolve(root, "index.html"), "utf8");
  const scripts = [...html.matchAll(/<script\s+[^>]*src=["']([^"']+)["'][^>]*>/g)]
    .map((match) => match[1].split("?")[0])
    .filter((source) => source.startsWith("src/content") && source.endsWith(".js"));

  if (!scripts.length) throw new Error("No content scripts found in index.html");

  globalThis.window = {};
  for (const script of scripts) {
    await import(pathToFileURL(resolve(root, script)).href);
  }

  if (!globalThis.window.GAME_CONTENT) {
    throw new Error("Content scripts did not create GAME_CONTENT");
  }
  return globalThis.window.GAME_CONTENT;
}
