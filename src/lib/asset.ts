export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string): string =>
  path.startsWith("/") ? `${BASE_PATH}${path}` : path;
