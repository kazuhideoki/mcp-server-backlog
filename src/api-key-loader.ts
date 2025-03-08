import fs from "fs";
import path from "path";

/**
 * Loads API key from a file
 * @param filePath Path to the file containing the API key
 * @returns The API key as a string
 */
export function loadApiKey(filePath: string): string {
  try {
    const absolutePath = path.resolve(filePath);
    const apiKey = fs.readFileSync(absolutePath, "utf8").trim();
    return apiKey;
  } catch (error: any) {
    throw new Error(
      `Failed to load API key from ${filePath}: ${error.message}`,
    );
  }
}
