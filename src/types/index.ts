export interface Habit {
  id: string;
  title: string;
  color: string;
  schedule: 'daily' | 'custom';
  customDays?: number[]; // 0 = Sunday, 1 = Monday, etc.
  createdAt: string;
  completions: Record<string, boolean>; // date string -> completed
}

export interface HabitFormData {
  title: string;
  color: string;
  schedule: 'daily' | 'custom';
  customDays: number[];
}