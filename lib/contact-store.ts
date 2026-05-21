import { promises as fs } from "fs";
import path from "path";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "data", "contact-submissions.json");

export async function saveContactSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt">,
): Promise<ContactSubmission> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  let list: ContactSubmission[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf8");
    list = JSON.parse(raw) as ContactSubmission[];
  } catch {
    list = [];
  }
  const entry: ContactSubmission = {
    id: `c_${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
  };
  list.push(entry);
  await fs.writeFile(filePath, JSON.stringify(list, null, 2), "utf8");
  return entry;
}
