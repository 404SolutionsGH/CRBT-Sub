import { appendFile } from "fs/promises";
import path from "path";

 export async function logToFile(filename:string, data:string) {
    const logFilePath = path.join(__dirname, filename);
    const logEntry = `[${new Date().toISOString()}] ${data}\n`;
    await appendFile(logFilePath, logEntry);
}