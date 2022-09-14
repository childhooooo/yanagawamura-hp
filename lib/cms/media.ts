import { Media, File } from "lib/graphql";

export function extractFile(media: Media, label: string): File | null {
  return media.files.filter((f: File) => f.label === label)[0] || null;
}
