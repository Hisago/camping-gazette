export type Item = {
  id: number;
  title: string;
  content?: string;
  date?: string;   // toujours string ISO
  extra?: string;
};